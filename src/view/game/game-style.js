const styles = `

    main {
      margin: var(--margin);
    }

    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .button-start {
      width: 200px;
      height: 40px;
      background-color: var(--color-primary);
      color: #FFF;
      border: none;
      border-radius: var(--border-radius);
      font-size: var(--font-size);
      cursor: pointer;
      margin: 16px
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
      background-color: var(--color-success);
    }

    .incorrect {
      background-color: var(--color-error);
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;
    }

    th {
      background-color: #f2f2f2;
    }



`;

export default styles;
