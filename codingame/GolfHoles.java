import java.util.*;
import java.io.*;
import java.math.*;

// https://www.codingame.com/ide/puzzle/winamax-sponsored-contest

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

// Planning: each ball has a shot count
// 1-balls must be in straight-lines, so we can greedily take these first
// 2-balls can turn one corner, but those can't be water

// We'll know if we cross paths because we'll overwrite character by character,
// we can overwrite an X (if we fly over the water) and a "." but not any of the
// arrow characters.

// "brute" force: plan the 1-balls, then the 2-balls to turn on non-waters
// are there any 3-balls or 4-balls? possibly, those would allow to turn more.
// Clarifying question: Are all boards guaranteed to have a solution?

// Greedy turning algorithm:
//   start with balls with maximum shot-count
// calculating routes for 1-balls and 2-balls is easy
// a Route is List<Pair> of points of turns, with last Pair being the hole.
// 
// if at any point, 

// We'll need some utility methods:

// Is this really dijsktra's shortest path?
// Represent each grid as a node in a graph with 4 neighbors.

// Hmm. Walk backwards from each hole (BFS)

// DATA TYPES
// Routes are made of one or more shots
// Route {
//   id,
//   hole_id, // of the route that this hole ends in
// }
//
// Shot {
//   id,
//   route_id, // to associate routes with same hole
//   turns_left // to reach hole, where 0 is we are last straight line shot
// }

// Point {
//   int x; // x coordinate starting at 0
//   int y; // y coordinate starting at 0
//   List<Shot> of shots that cross over this point, including their route
//   visited: boolean
// }

// Hole {
// subclass of Point 
// and List<Shot> null
// visited is always set true first
// }

// Algorithm state
// CONFLICTS = Graph<Route>, with edges between routes if they overlap at a node
//   operations:
//     create undirected edge between two routes, during our BFS
//     check if an undirected edge exists between two routes
//     remove undirected edge between two routes, during our ball walk
// MAX_SHOTS = update this as you parse the grid
// BALLS = List<Point> we populate these as we parse grid
// TO_VISIT: Queue<Point>

// Part I. Parse grid into Point[][], first coordinate y, second coordinate y
//   add to BALLS as we find them
//   update MAX_SHOTS as we find them
//   keep the grid for writing our output into
// O(n^2)

// Part II. BFS on grid from
// , initialized to all HOLES 
//   Dequeue latest node to explore.
//   If node already visited, we continue with BFS
//   mark node as visited.
//   If you reach an X, go past it if possible without increasing turns
//   If you reach an ., take all the turns (push those nodes into the to_visit queue with turns + 1 )
//     unless they increase greater than MAX_SHOTS, then we skip those, pruning those paths
//   Stop when you reach a ball

// Part III.
// Sort balls (subset of points) by fewest routes that end with them
// Loop over the balls
//   choose path at random, and remove all conflicting routes
//     write that path with arrows in the original grid. 

// 4 4
// 3H.X
// .1.H
// ....
// ....

// Holes are
// (0,1) and (1,3)
// MAX_SHOTS = 2
// BALLS = [ (0,0), (1,1)]
// These are ending points of holes and have no shots/routes
// TO_VISIT = [ (0,1)H (1,3)H ]

// Dequeue (0,1), unvisited, mark visited
// VISITED = [(0,1)]
// ROUTES [Route1, Route2, Route3], no conflicts 
// prepare next points/shots  (x,y),shotId_DIR,routeId,turnsLeft
//   (0,0)0E,0,0 (0,2)1N,1,0 (1,1)2W,2,0
//   all 0 shots left because we are on last turn

// Enqueue children: TO_VISIT = [ (1,3)H, (0,0)0E,0,0, (0,2),1N,1,0, (1,1),2W,20

// Dequeue (1,3)H, mark visited
// VISITED = [(0,1), (1,3)] // not a real DS, just here for bookkeeping
// prepare next shots (we go in all 4 directions)
//   NORTH: X is above us, nothing is above that, so end this direction
//   EAST: we are at the border, no go
//   SOUTH: (2,3)3N,3,0 
//   WEST: (1,2),4,4,0
// again, all zero shot because we are on last shot on straight
// Enqueue children: TO_VISIT = [ (0,0)0,0,0, (0,2),1,1,0, (1,1),2,2,0, (2,3),3,3,0, (1,2),4,4,0

// Dequeue (0,0)0,0,0, mark visited
// VISITED = [ (0,1), (1,3), (0,0)]
// prepare next shots (we go in all 4 directions)
//   NORTH: at border, no go
//   EAST: back to our parent (check our shot direction), no go
//   SOUTH: (1,0),5,0,1 // we add a new turn shot 5 to route 0 , 1 shot
//   WEST: at border, no go
// Enqueue children: TO_VISIT = [ (0,2),1,1,0, (1,1),2,2,0, (2,3),3,3,0, (1,2),4,4,0, (1,0),5,0,1)

// Dequeue (0,2),1,1,0, mark visited
// VISITED = [ (0,1), (1,3), (0,0), (0,2)]
// prepare next shots (we go in all 4 directions)
//   NORTH: at border, no go
//   EAST: there is an X on border, nothing on other side, no go
//   SOUTH: (1,2),4,4,0, already enqueued not visited, we add new route/shot going down
//   WEST: (0,1) back the direction we came, no go
// Enqueue children: TO_VISIT = [ (1,1),2,2,0, (2,3),3,3,0, (1,2),<4,4,0>,<6,5,1>, (1,0),5,0,1)

// Dequeue (1,1),2,2,0, mark visited (balls can be visited multiple times)
// we are a ball, no more need to explore
// VISITED = [ (0,1), (1,3), (0,0), (0,2), (1,1)<2,2,0>]

// Dequeue (2,3),3,3,0, mark visited
// I think keeping visited status is not useful
// prepare directions
//   NORTH: the way we came no go
//   EAST: at border, no go
//   SOUTH: (3,3),7,3,0 same route as us, no turn
//   WEST: (2,2),8,6,1  new route/turn, +1 shots left
// Enqueue children: TO_VISIT = [ (1,2),<4,4,0>,<6,5,1>, (1,0),5,0,1), (3,3),7,3,0, (2,2),8,6,1]

// Dequeue (1,2),<4,4,0>,<6,5,1>, mark visited
// it's not enough to keep routes/shots, we need the direction as well
//  these two shots passing through us mean in two of our
//  children, we don't increase shot number.
//  but that we could double/triple number of children we consider!
//  for each existing shot/route, we have straight, and two kinds of turns
// prepare directions
//   NORTH: (0,2), we can continue <4,4,0>,<6,5,1> new add/turn <9,7,1> to <1,1,0>
//   EAST: the way we came no go
//   SOUTH: (2,2),
//   WEST: (1,1),8,5,1  new route/turn, +1 shots left
// Enqueue children: TO_VISIT = [ (1,2),<4,4,0>,<6,4,1>, (1,0),5,0,1), (3,3),7,3,0, (2,2),8,5,1]

class Solution {

    // These are needed to track how shots
    public static enum Direction {
        NORTH,
        EAST,
        SOUTH,
        WEST
    }

    public static class Point {
        int x;
        int y;
        int shotId;

        Point(int x, int y, int shotId) {
            this.x = x;
            this.y = y;
            this.shotId = shotId;
        }
    }

    public static class Shot {
        int shotId;
        int routeId;
        // direction to get closer to our hole on this route
        int directionIndex;
        int turnsLeft;

        // Globally unique shot IDs
        static int shotCounter = 0;

        public Shot(int routeId, Direction direction) {
            this.shotId = shotCounter;
            shotCounter += 1;
            this.routeId = routeId;
            this.directionIndex = direction.ordinal();
            this.turnsLeft = 0;
        }

        public Shot addTurn(Direction newDirection) {
            // We only allow turns that are +1 or +3 away from us
            // mod 4 in the direction wheel.
            // +2 mod 4 would be our opposite direction,
            // and golf shots don't go that way.
            // we are +0 mod 4, and that is no turn at all.
            int newOrdinal = newDirection.ordinal();
            int possible1 = (this.directionIndex + 1) % Direction.values().length;
            int possible2 = (this.directionIndex + 3) % Direction.values().length;
            if ((newOrdinal != possible1) && (newOrdinal != possible2)) {
                // invalid turn
                return null;
            }

            // Valid turn, create a new Shot and return it with
            // the same RouteId's
            int reverseOrdinal = (newOrdinal + 2) % Direction.values().length;

            return new Shot(this.routeId, Direction.values()[reverseOrdinal]);
        }

    }

    public static void main(String args[]) {
        Scanner in = new Scanner(System.in);
        int width = in.nextInt();
        int height = in.nextInt();
        char[][] grid = new char[width][height];
        // We start in upper left corner (0,0) going EAST and proceed
        // clockwise
        Direction d = Direction.EAST;

        // Read in the strings and populate our grid
        // X water trap (cannot turn a corner when hitting a ball here)
        for (int i = 0; i < height; i++) {
            String row = in.next();
        }

        // Do we need to know the midpoint of our grid?
        // No, we'll mark
        // While loop
    }
}