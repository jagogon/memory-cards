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

.user-info img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-info span {
  font-size: 16px;
}

.right select {
  padding: 8px;
  font-size: 16px;
  border: none;
  background-color: #444;
  color: #fff;
  border-radius: 5px;
}

.right select:hover {
  background-color: #555;
}
`;

export default styles;
