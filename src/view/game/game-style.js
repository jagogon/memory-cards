const styles = `

main {
  margin: 16px;
}

.button-start {
  width: 200px;
  height: 40px;
  background-color: #007BFF;
  color: #FFF;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  // transition: background-color 0.3s ease 0s;
}

.button-start:disabled {
  background-color:  #808080;;
}


  .box {
    display: inline-block;
    width: 50px;
    height: 50px;
    margin: 5px;
    text-align: center;
    line-height: 50px;
    border: 1px solid #000;
    cursor: pointer;
    }

    .box:hover {
    background-color: lightgray;
    }

    .box.selected {
    background-color: green;
    }

    .box.wrong {
    background-color: red;
    }


`;

export default styles;
