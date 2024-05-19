const styles = `

:host {
  display: block;
  width: calc(100vw - 10%);
  margin-top: 24px
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

a {
  cursor: pointer;
  text-decoration: underline;
  color: var(--color-primary);
}

a:hover {
  color: darkblue;
}

`;

export default styles;
