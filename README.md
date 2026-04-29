# BetGames dev test - Steven Davies
A simple world viewer with thousands of objects off screen and a moving camera controlled by keyboard

## Setup
npm install
npm run dev

## Controls
WASD to move camera

## Archutecture
Using a simple object pool that can has objects which are drawn from a rendered, a list of active objects is maintained and updated via a ticker event, objects are added or removed from the scene uring this update.

If I was to redo this I would create an abstract display object which can maintain it's own adding and removing from the scene to allow for more complex updating and displays such as animated objects.

spatial hash is used over alternatives due to its simplisity, predicatble performance compared to the other options such as Quadtree, I wouuld switch to a grid approach for a tile based world map if the intention was to create a wrold map instead of a world of objects