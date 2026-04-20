import pygame
import random
import math
import csv
import os
from datetime import datetime

# --- Configuration ---
WIDTH, HEIGHT = 900, 700
FPS = 60

# Colors
COLOR_BG = (248, 249, 250)
COLOR_WALL = (142, 149, 161)
COLOR_AGENT = (45, 99, 226)
COLOR_GOAL = (244, 67, 54)
COLOR_VISION = (45, 99, 226, 30)
COLOR_PATH = (173, 181, 189)

class Agent:
    def __init__(self, x, y):
        self.pos = pygame.Vector2(x, y)
        self.velocity = pygame.Vector2(0, 0)
        self.speed = 3.0
        self.fov = 120
        self.vision_range = 200
        self.memory = []
        self.history = [(x, y)]
        self.state = "RANDOM" # RANDOM, DIRECTIONAL, GOAL
        self.target_dir = 0
        
    def get_vision_cone(self):
        # Simplification of vision for 2D
        pass

    def update(self, goal, walls):
        dist_to_goal = self.pos.distance_to(goal)
        
        # Check if goal is in vision range and not blocked by walls
        can_see_goal = dist_to_goal < self.vision_range
        # (Simplified wall check for prototype)
        for wall in walls:
            if wall.clipline(self.pos, goal):
                can_see_goal = False
                break

        # State Transitions (From the Paper)
        if can_see_goal:
            self.state = "GOAL"
        elif dist_to_goal > self.vision_range and random.random() < 0.01:
            self.state = "RANDOM"
        elif dist_to_goal > self.vision_range * 1.5:
            self.state = "DIRECTIONAL"

        # Movement Logic
        if self.state == "GOAL":
            direction = (goal - self.pos).normalize()
            self.velocity = direction * self.speed
        elif self.state == "DIRECTIONAL":
            # Head towards general direction of goal
            direction = (goal - self.pos).normalize()
            # Add some jitter to mimic human uncertainty
            jitter = pygame.Vector2(random.uniform(-0.2, 0.2), random.uniform(-0.2, 0.2))
            self.velocity = (direction + jitter).normalize() * self.speed
        else: # RANDOM
            if random.random() < 0.05:
                angle = random.uniform(0, 360)
                self.velocity = pygame.Vector2(math.cos(angle), math.sin(angle)) * self.speed

        # Wall Collision Prevention
        next_pos = self.pos + self.velocity
        for wall in walls:
            if wall.collidepoint(next_pos):
                self.velocity *= -0.5 # Bounce back
                break
        
        self.pos += self.velocity
        self.history.append((int(self.pos.x), int(self.pos.y)))

    def draw(self, surface):
        # Draw path history
        if len(self.history) > 1:
            pygame.draw.lines(surface, COLOR_PATH, False, self.history, 2)
        
        # Draw Agent
        pygame.draw.circle(surface, COLOR_AGENT, (int(self.pos.x), int(self.pos.y)), 10)
        
        # Draw Visual Guide (Direction)
        if self.velocity.length() > 0:
            end_point = self.pos + self.velocity.normalize() * 20
            pygame.draw.line(surface, (255, 255, 255), self.pos, end_point, 2)

class Simulation:
    def __init__(self):
        pygame.init()
        self.screen = pygame.display.set_mode((WIDTH, HEIGHT))
        pygame.display.set_caption("SB Kim CogARCH Simulator (Python Version)")
        self.clock = pygame.time.Clock()
        self.font = pygame.font.SysFont("Arial", 16)
        
        self.agent = Agent(100, 100)
        self.goal = pygame.Vector2(800, 600)
        self.walls = [
            pygame.Rect(300, 0, 30, 400),
            pygame.Rect(500, 300, 30, 400),
            pygame.Rect(100, 500, 400, 30)
        ]
        self.log_data = []

    def save_log(self):
        filename = f"sim_log_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
        with open(filename, 'w', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(['Time', 'X', 'Y', 'State'])
            for i, pos in enumerate(self.agent.history):
                writer.writerow([i*0.1, pos[0], pos[1], "N/A"])
        print(f"Log saved as {filename}")

    def run(self):
        running = True
        while running:
            self.screen.fill(COLOR_BG)
            
            # Events
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    running = False
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_s:
                        self.save_log()

            # Update
            self.agent.update(self.goal, self.walls)

            # Draw
            for wall in self.walls:
                pygame.draw.rect(self.screen, COLOR_WALL, wall)
            
            pygame.draw.circle(self.screen, COLOR_GOAL, (int(self.goal.x), int(self.goal.y)), 15)
            self.agent.draw(self.screen)

            # UI Text
            state_text = self.font.render(f"State: {self.agent.state}", True, (0, 0, 0))
            instr_text = self.font.render("Press 'S' to save CSV log", True, (100, 100, 100))
            self.screen.blit(state_text, (20, 20))
            self.screen.blit(instr_text, (20, 45))

            pygame.display.flip()
            self.clock.tick(FPS)
        
        pygame.quit()

if __name__ == "__main__":
    sim = Simulation()
    sim.run()
