import styles from '../styles/components/PropertyItem.module.scss';

export type Property = {
  type_property: string;
  state: string;
  city: string;
  neighborhood: string;
  price: number;
  dependencies: string;
}

type PropertyProps = {
  property: Property;
}

export function PropertyItem({ property }: PropertyProps) {
  return (
    <div className={styles.propertyItemContainer}>
      <table>
        <thead>
          <tr>
            <th>Tipo de Imóvel</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Bairro</th>
            <th>Preço</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{property.type_property}</td>
            <td>{property.city}</td>
            <td>{property.state}</td>
            <td>{property.neighborhood}</td>
            <td>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(property.price)}
            </td>
          </tr>
        </tbody>
      </table>

      <div>
        <p>Quarto, Cozinha</p>
      </div>
    </div>
  );
}