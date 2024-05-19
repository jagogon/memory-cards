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

  .user-info {
    display: flex;
    align-items: center;

    span {
      font-size: 16px;
    }

  }

}


.right{
  select {
    padding: 8px;
    font-size: 16px;
    border: none;
    background-color: white;
    color: black;
  }


}



`;

export default styles;
