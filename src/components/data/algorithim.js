export const algorithms = {
    sorting: [
      {
        id: "bubble-sort",
        title: "Bubble Sort",
        howItWorks: [
          "Compare two neighboring elements",
          "Swap if they are in the wrong order",
          "Repeat until no swaps are needed"
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
          "Start at the first element",
          "Find the smallest element in the remaining array",
          "Swap it with the current position",
          "Move boundary forward and repeat"
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
          "Check each element one by one",
          "Stop when the target is found"
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
      }
    ]
  };
