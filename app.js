function minmax(position, visited, tolls, destination) {
    if (position === destination) {
        return [0, []];
    }

    let minToll = Infinity;
    let bestPath = [];

    const neighbors = get_neighbors(position, bridges);
    for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
            visited.add(neighbor);

            const [toll, path] = minmax(neighbor, visited, tolls, destination);
            const bridgeToll = tolls[position][neighbor];

            if (bridgeToll < minToll) {
                minToll = bridgeToll;
                bestPath = [position, ...path];
            }
        }
    }

    return [minToll + tolls[position][destination], bestPath];
}

function get_neighbors(position, bridges) {
    return bridges[position] || [];
}



// Example usage
const initialPosition = 'A'; // Replace with the actual initial position
const destination = 'E'; // Replace with the actual destination

const bridges = {
    'A': ['B', 'H'],
    'B': ['A', 'C', 'H'],
    'C': ['B', 'I', 'D', 'F'],
    'D': ['C', 'F', 'E'],
    'E': ['D', 'F'],
    'F': ['C', 'D', 'E', 'G'],
    'G': ['F', 'H', 'I'],
    'H': ['G', 'I', 'B', 'A'],
    'I': ['C', 'G', 'H'],
};

const tolls = {
    'A': { 'B': 4, 'H': 8 },
    'B': { 'A': 4, 'C': 8, 'H': 11 },
    'C': { 'B': 8, 'I': 2, 'D': 7, 'F': 4 },
    'D': { 'C': 7, 'F': 14, 'E': 9 },
    'E': { 'D': 9, 'F': 10 },
    'F': { 'C': 4, 'D': 14, 'E': 10, 'G': 2 },
    'G': { 'F': 2, 'H': 1, 'I': 6 },
    'H': { 'G': 1, 'I': 7, 'B': 11, 'A': 8 },
    'I': { 'C': 2, 'G': 6, 'H': 7 }
};

const visited = new Set();
visited.add(initialPosition);

const [minToll, path] = minmax(initialPosition, visited, tolls);

console.log('Minimum toll paid:', minToll);
console.log('Number of islands visited:', path.length);
console.log('Best path:', path);
