const styles = `
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  input[type="text"] {
    width: calc(100vw - 10%);
    height: 40px;
    margin-bottom: 20px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  input:focus {
    outline: 2px solid #007bff;
  }

  button {
    width: calc(100vw - 10%);
    height: 40px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #0056b3;
  }

  .msg {
    margin: 16px;
    color: #ff0000;
  }

`;

export default styles;
