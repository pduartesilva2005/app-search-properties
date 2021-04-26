import { ReactNode, useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from 'next/router';
import axios from 'axios';

import { api } from "../services/api";

import styles from '../styles/components/Modal.module.scss';

type ModalProps = {
  cancelButton?: ReactNode;
}

type IBGEUFResponse = {
  sigla: string;
}

type IBGECityResponse = {
  nome: string;
}

export function Modal({ cancelButton }: ModalProps) { 
  const routes = useRouter();

  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [type_property, setTypeProperty] = useState('');
  const [state, setState] = useState('0');
  const [city, setCity] = useState('0');
  const [neighborhood, setNeighborhood] = useState('');
  const [price, setPrice] = useState('');
  const [dependencies, setDependencies] = useState('');

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response => {
        const ufInitials = response.data.map(uf => uf.sigla);

        setStates(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (state === '0') {
      return;
    }

    axios
      .get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`)
      .then(response => {
        const cityNames = response.data.map(city => city.nome);

        setCities(cityNames);
      });
  }, [state]);

  function handleSelectState(e: ChangeEvent<HTMLSelectElement>) {
    const state = e.target.value;

    setState(state);
  }

  function handleSelectCity(e: ChangeEvent<HTMLSelectElement>) {
    const city = e.target.value;

    setCity(city);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    await api.post('properties', {
      type_property,
      state,
      city,
      neighborhood,
      price,
      dependencies
     })
     .then(() => {
        alert('Cadastro com Sucesso!')
        routes.push('/');
     })
     .catch(() => alert('Erro no Cadastro!'));
  }

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <div className={styles.form}>
          <h2>Novo Imóvel</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.selectBlock}>
              <label htmlFor="type_property">Tipo do Imóvel</label>
              <select 
                name="type_property"
                value={type_property}
                onChange={e => setTypeProperty(e.target.value)}
              >
                <option value="" disabled hidden>
                  Selecione uma Opção
                </option>

                <option value="Casa Térrea">Casa Térrea</option>
                <option value="Apartamento">Apartamento</option>
                <option value="Mansão">Mansão</option>
                <option value="Sobrado">Sobrado</option>
                <option value="Assobrado">Assobrado</option>
                <option value="Fazenda">Fazenda</option>
              </select>
            </div>

            <div className={styles.selectBlock}>
              <label htmlFor="state">Estado</label>
              <select 
                name="state"
                value={state}
                onChange={handleSelectState}
              >
                <option value="0">
                  Selecione um Estado
                </option>
                {states.map(state => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.selectBlock}>
              <label htmlFor="city">Cidade</label>
              <select 
                name="city"
                value={city}
                onChange={handleSelectCity}
              >
                <option value="0">
                  Selecione uma Opção
                </option>
                {cities.map(city => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.inputBlock}>
              <label htmlFor="neighborhood">Bairro</label>
              <input 
                type="text" 
                name="neighborhood"
                value={neighborhood}
                onChange={e => setNeighborhood(e.target.value)}
              />
            </div>

            <div className={styles.inputBlock}>
              <label htmlFor="price">Preço</label>
              <input 
                type="number" 
                name="price" 
                placeholder="R$"
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </div>

            <div className={styles.inputBlock}>
              <label htmlFor="dependencies">Dependências</label>
              <input 
                type="text" 
                name="dependencies"
                value={dependencies}
                onChange={e => setDependencies(e.target.value)}
              />
            </div>

            <div className={styles.buttonsContainer}>
              {cancelButton}
              <button type="submit" className={styles.buttonNew}>
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}