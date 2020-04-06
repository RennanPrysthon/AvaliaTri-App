import React, {useState, useEffect, useMemo, useCallback} from 'react';

import {RefreshControl} from 'react-native';
import {Container, Part} from './styles';

import {useDispatch, useSelector} from 'react-redux';

import { Api } from '../../services/api';
import ProvaNaoSalva from '../../components/ProvaNaoSalva/index';

import { Types as provasTypes, StatusProva } from "../../store/ducks/provas";
import { Types as questoesTypes } from "../../store/ducks/questoes";
import ProvaSalva from '../../components/ProvaSalva/index';

export default function Main({navigation}) {
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [feed, setFeed] = useState([])

  const provas = useSelector(state => state.provas)
  const auth = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const reload = async () => {
    setPage(0);
    getProvas()
  }

  const getProvas = useCallback(
    async () => {
      setLoading(true);
    
      const data = await Api.get(`/provas?id=${auth.user.user_id}&page=${page}`)
      setFeed(data.content)

      setLoading(false)
    }
  , [page])

  useEffect(() => {
    getProvas()
  }, [getProvas])

  const montarLista = useCallback(
    (data) => data.filter(p => (!provas.map(p => p.id).includes(p.id))), [provas, feed]);

  const onCarregarProva = async (id) => {
    
    const data = await Api.get(`provas/${id}`)

    var prova = {}

    prova.id = data.id;
    prova.titulo = data.titulo;
    prova.status = StatusProva.INICIADA;

    var questoes = data.questoes
    
    prova.qtd_questoes = questoes.length;
    questoes.map(q => {
      q.respondida = false,
      q.respostaUsuario = "",
      q.idProva = prova.id
    });

    dispatch({type: provasTypes.ADD_PROVA, provas: prova});
    dispatch({type: questoesTypes.ADD_QUESTOES, questoes: questoes});
    navigation.navigate('FazerProva', {id: prova.id, titulo: prova.titulo});
  }

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 1;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const List = useMemo(() => {
    const res = montarLista(feed)
    return (
      <Part>
        {provas.map(p => (
          <ProvaSalva 
            key={p.id} 
            data={p} 
            onContinuarTeste={(id) => navigation.navigate('FazerProva', {id: id, titulo: p.titulo})}
            onVerResult={(id) => navigation.navigate('Resultado', {idProva: id})}
          />
        ))}
        {res.map(p => (
          <ProvaNaoSalva 
            key={p.id} 
            data={p} 
            onFazerTest={(id) => onCarregarProva(id)}
            onVerResult={(id) => navigation.navigate('Resultado', {idProva: id})}
          />
        ))}
      </Part>
    )
  }, [provas, feed]);

  return (
    <Container
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={reload} />
      }
      onScroll={({nativeEvent}) => {
        if (isCloseToBottom(nativeEvent)) {
          setPage(page => page + 1)
        }
      }}>
      {!loading && List}
    </Container>
  );
}
