import { css } from 'lit';

const styles = css`
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  input[type='text'] {
    width: calc(100vw - 10%);
    height: 40px;
    margin-bottom: 20px;
    padding: 8px;
    font-size: var(--font-size);
    border: 1px solid #ccc;
    border-radius: var(--border-radius);
  }

  input:focus {
    outline: 2px solid var(--color-primary);
  }

  button {
    width: calc(100vw - 10%);
    height: 40px;
    background-color: var(--color-primary);
    color: #fff;
    border: none;
    border-radius: var(--border-radius);
    font-size: var(--font-size);
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #0056b3;
  }

  .msg {
    margin: var(--margin);
    color: var(--color-error);
  }
`;

export default styles;
