const styles = `
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
}

.left {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-info span {
  font-size: 16px;
}

.right select {
  padding: 8px;
  font-size: 16px;
  border: none;
  background-color: white;
  color: black;
}

.right option {
  background-color: white;
  color: black;
}

.right option:checked {
  background-color: grey;
  color: white;
}

`;

export default styles;
