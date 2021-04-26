import Head from "next/head";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from 'axios';

import { Header } from "../components/Header";
import { Property, PropertyItem } from "../components/PropertyItem";
import { Modal } from "../components/Modal";
import { api } from "../services/api";

import styles from '../styles/pages/Home.module.scss';

type IBGEUFResponse = {
  sigla: string;
}

type IBGECityResponse = {
  nome: string;
}

export default function Home() {
  const [isModalActive, setIsModalActive] = useState(false);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);

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

    const response = await api.get('properties', {
      params: {
        type_property,
        city,
        state,
        neighborhood,
        price,
        dependencies
      }
    });

    setProperties(response.data);
  }

  return (
    <div className={styles.homepage}>
      <Head>
        <title>Search Properties</title>
      </Head>

      <Header>
        <form onSubmit={handleSubmit} className={styles.form}>
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
              name="neighborhood"
              value={dependencies}
              onChange={e => setDependencies(e.target.value)}
            />
          </div>

          <button className={styles.button} type="submit">
            Buscar
          </button>
        </form>
      </Header>

      <main>
        <button 
          type="button"
          className={styles.buttonAdd}
          onClick={() => setIsModalActive(true)}
        >
          + Adicionar Imóvel
        </button>

        {!properties && (
          <p className={styles.noResults}>
            Nenhum imóvel encontrado
          </p>
        )}

        {properties.map(property => {
          return (
            <PropertyItem 
              key={property.type_property} 
              property={property} 
            />
          )
        })}

        { isModalActive && (
          <Modal 
            cancelButton={(
              <button 
                className={styles.buttonCancel}
                onClick={() => setIsModalActive(false)}
              >
                Cancelar
              </button>
            )}
          />
        ) }
      </main>
    </div>
  )
}