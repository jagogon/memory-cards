const styles = `

    main {
      margin: 16px;
    }

    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
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
    }

    .button-start:disabled {
      background-color: #808080;;
    }

    .card-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding: 16px;
    }

    .card {
      width: calc(33.33% - 24px);
      margin-bottom: 24px;
      background-color: #FFF;
      border: 1px solid #ccc;
      box-sizing: border-box;
      padding: 16px;
      text-align: center;

      span {
        font-size: 36px;
      }

    }

    .question{
      min-height:36px;
      text-align: center;
    }

    .correct {
      background-color: green;
    }

    .incorrect {
      background-color: red;
    }
`;

export default styles;
