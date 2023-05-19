function solveQueens() {
    const size = parseInt(document.getElementById('size').value);
    const boardContainer = document.getElementById('boardContainer');
    
    // 초기화하기
    boardContainer.innerHTML = '';
    
    // 문제 풀기
    const solutions = [];
    backtrack([], size, solutions);
    
    // 해결책 출력하기
    solutions.forEach((solution, index) => {
      const board = createEmptyBoard(size);
      solution.forEach((row, col) => {
        board[row][col] = 1;
      });
      displayBoard(board, index + 1);
    });
  }

  function createEmptyBoard(size) {
    const board = [];
    for (let row = 0; row < size; row++) {
      board[row] = [];
      for (let col = 0; col < size; col++) {
        board[row][col] = 0;
      }
    }
    return board;
  }
  //빈 보드를 만들기 위한 함수

  function backtrack(current, size, solutions) {
    if (current.length === size) {
      solutions.push([...current]);
      return;
    }
    for (let col = 0; col < size; col++) {
      if (isValid(current, col)) {
        current.push(col);
        backtrack(current, size, solutions);
        current.pop();
      }
    }
  }
  //백트래킹 함수

  function isValid(current, col) {
    const row = current.length;
    for (let i = 0; i < current.length; i++) {
      if (current[i] === col || current[i] - i === col - row || current[i] + i === col + row) {
        return false;
      }
    }
    return true;
  }
  //유효성 검사 함수

  function displayBoard(board, index) {
    const size = board.length;
    const table = document.createElement('table');
    table.classList.add('board');
    const caption = document.createElement('caption');
    caption.textContent = `Solution ${index}`;
    table.appendChild(caption);
    for (let row = 0; row < size; row++) {
      const tr = document.createElement('tr');
      for (let col = 0; col < size; col++) {
        const td = document.createElement('td');
        if (board[row][col] === 1) {
          td.classList.add('queen');
                      td.textContent = 'Q';
        }
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    const boardContainer = document.getElementById('boardContainer');
    const solutionCount = document.createElement('p');
    solutionCount.textContent = `Solution : ${countNQueens(size)}`;
    boardContainer.appendChild(table);
  }
  //해결책 출력 함수

  function countNQueens(size) {
    const solutions = [];
    backtrack([], size, solutions);
    return solutions.length;
  }
