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
      font-size: var(--font-size);
    }
    img {
      margin:4px
    }

  }
}

.right{

  .right-container{
    display: flex;
    justify-content: center;
    align-items: center;

    select {
      padding: 8px;
      margin:0px 8px;
      font-size: var(--font-size);
      border: none;
      background-color: white;
      color: black;
    }

    img {
      height:24px;
      margin:4px 4px 4px 8px;
    }

  }



}

`;

export default styles;
