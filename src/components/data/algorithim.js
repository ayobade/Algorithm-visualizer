export const algorithms = {
    sorting: [
      {
        id: "bubble-sort",
        title: "Bubble Sort",
        howItWorks: [
          "Scan adjacent pairs left→right",
          "Swap pairs that are out of order",
          "Repeat passes until no swaps occur"
        ],
        uses: [
          "Educational demos and very small lists",
          "Simple baseline for comparing sort algorithms"
        ],
        code: {
          javascript: `function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return arr;
  }`,
          python: `def bubble_sort(arr):
      n = len(arr)
      for i in range(n):
          for j in range(0, n-i-1):
              if arr[j] > arr[j+1]:
                  arr[j], arr[j+1] = arr[j+1], arr[j]
      return arr`,
          c: `void bubbleSort(int arr[], int n) {
      for (int i = 0; i < n-1; i++) {
          for (int j = 0; j < n-i-1; j++) {
              if (arr[j] > arr[j+1]) {
                  int temp = arr[j];
                  arr[j] = arr[j+1];
                  arr[j+1] = temp;
              }
          }
      }
  }`
        }
      },
      {
        id: "selection-sort",
        title: "Selection Sort",
        howItWorks: [
          "Partition array into sorted/unsorted",
          "Select smallest from unsorted each pass",
          "Swap it into next sorted position"
        ],
        uses: [
          "Good for teaching selection strategy",
          "Low memory environments when stability isn't required"
        ],
        code: {
          javascript: `function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) minIndex = j;
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
}`,
          python: `def selection_sort(arr):
    for i in range(len(arr)):
        min_index = i
        for j in range(i+1, len(arr)):
            if arr[j] < arr[min_index]:
                min_index = j
        arr[i], arr[min_index] = arr[min_index], arr[i]
    return arr`,
          java: `public static void selectionSort(int[] arr) {
    for (int i = 0; i < arr.length; i++) {
        int minIndex = i;
        for (int j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) minIndex = j;
        }
        int temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
}`
        }
      }
    ],
  
    searching: [
      {
        id: "linear-search",
        title: "Linear Search",
        howItWorks: [
          "Scan elements from start to end",
          "Compare each to the target and stop on a match"
        ],
        uses: [
          "Small or unsorted datasets",
          "Fallback when building an index is unnecessary"
        ],
        code: {
          javascript: `function linearSearch(arr, x) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === x) return i;
    }
    return -1;
  }`,
          python: `def linear_search(arr, x):
      for i in range(len(arr)):
          if arr[i] == x:
              return i
      return -1`,
          c: `int linearSearch(int arr[], int n, int x) {
      for (int i = 0; i < n; i++) {
          if (arr[i] == x) return i;
      }
      return -1;
  }`
        }
      },
      {
        id: "breadth-first-search",
        title: "Breadth-First Search (BFS)",
        howItWorks: [
          "Use a queue to explore nodes level by level",
          "Mark nodes as visited when enqueued",
          "Dequeue a node, visit it, enqueue unvisited neighbors"
        ],
        uses: [
          "Unweighted shortest paths",
          "Layered exploration in graphs, trees, and grids"
        ],
        code: {
          javascript: `function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  const order = [];
  visited.add(start);
  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const neighbor of (graph[node] || [])) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return order;
}`,
          python: `from collections import deque

def bfs(graph, start):
    visited = set([start])
    queue = deque([start])
    order = []
    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return order`,
          java: `import java.util.*;

public static List<String> bfs(Map<String, List<String>> graph, String start) {
    Set<String> visited = new HashSet<>();
    Queue<String> queue = new ArrayDeque<>();
    List<String> order = new ArrayList<>();
    visited.add(start);
    queue.add(start);
    while (!queue.isEmpty()) {
        String node = queue.remove();
        order.add(node);
        List<String> neighbors = graph.getOrDefault(node, Collections.emptyList());
        for (String neighbor : neighbors) {
            if (!visited.contains(neighbor)) {
                visited.add(neighbor);
                queue.add(neighbor);
            }
        }
    }
    return order;
}`
        }
      }
    ],

  crypto: [
    {
      id: "caesar-cipher",
      title: "Caesar Cipher",
      howItWorks: [
        "Shift each letter by a fixed key",
        "Wrap around within the alphabet",
        "Preserve non-letters as-is"
      ],
      uses: [
        "Teaching classical cryptography basics",
        "Toy obfuscation (not secure for real data)"
      ],
      code: {
        javascript: `function caesarCipher(text, shift, mode = 'encrypt') {
  const a = 'a'.charCodeAt(0), z = 'z'.charCodeAt(0)
  const A = 'A'.charCodeAt(0), Z = 'Z'.charCodeAt(0)
  const k = ((mode === 'encrypt' ? shift : -shift) % 26 + 26) % 26
  let out = ''
  for (const ch of text) {
    const c = ch.charCodeAt(0)
    if (c >= a && c <= z) {
      out += String.fromCharCode(((c - a + k) % 26) + a)
    } else if (c >= A && c <= Z) {
      out += String.fromCharCode(((c - A + k) % 26) + A)
    } else {
      out += ch
    }
  }
  return out
}`,
        python: `def caesar_cipher(text, shift, mode='encrypt'):
    k = ((shift if mode=='encrypt' else -shift) % 26 + 26) % 26
    out = []
    for ch in text:
        if 'a' <= ch <= 'z':
            out.append(chr((ord(ch)-ord('a')+k)%26 + ord('a')))
        elif 'A' <= ch <= 'Z':
            out.append(chr((ord(ch)-ord('A')+k)%26 + ord('A')))
        else:
            out.append(ch)
    return ''.join(out)`,
        java: `public static String caesarCipher(String text, int shift, boolean encrypt) {
    int k = ((encrypt ? shift : -shift) % 26 + 26) % 26;
    StringBuilder out = new StringBuilder();
    for (char ch : text.toCharArray()) {
        if (ch >= 'a' && ch <= 'z') {
            out.append((char)('a' + (ch - 'a' + k) % 26));
        } else if (ch >= 'A' && ch <= 'Z') {
            out.append((char)('A' + (ch - 'A' + k) % 26));
        } else {
            out.append(ch);
        }
    }
    return out.toString();
}`
      }
    }
  ]
  
  
  };
