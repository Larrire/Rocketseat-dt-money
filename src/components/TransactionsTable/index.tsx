import { useEffect } from "react";
import { Container } from "./styles";
import { createServer } from "miragejs";
import { api } from "../../service/api";

export function TransactionsTable() {
  useEffect(() => {
    api.get('transactions')
      .then(response => console.log(response.data));
  }, [])

  createServer({
    routes() {
      this.namespace = 'api'

      this.get('/transactions', () => {
        return [
          {
            id: 1,
            title: 'Transaction 1',
            amount: 400,
            type: 'deposit',
            category: 'Food',
            createdAt: new Date( )
          }
        ]
      })
    }
  })
  
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Desenvolvimento de website</td>
            <td className="deposit">R$12.000</td>
            <td>Desenvolvimento</td>
            <td>20/02/2022</td>
          </tr>
          <tr>
            <td>Aluguel</td>
            <td className="withdraw">- R$1.000</td>
            <td>Casa</td>
            <td>17/02/2022</td>
          </tr>
        </tbody>
      </table>
    </Container>
  )
}