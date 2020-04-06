import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 10px;
  background-color: #fff;
  margin-top: 5px;
`;

export const Header = styled.View`
  width: 100%;
  flex-grow: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Titulo = styled.Text`
  flex: 1;
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

export const SubTitulo = styled.Text`
  color: #777;
`;

export const Rodape = styled.View`
  margin-top: 20px;
  flex-direction: row;
  justify-content: space-between;
`;

export const RodapeTexto = styled.Text`
  color: #333;

`;

export const Data = styled.Text`
  color: #333;
`;

export const Submit = styled.TouchableOpacity`
  background-color: #000;
  padding: 15px 20px;
  margin: 15px 5px 0px 5px;
  align-items: center;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const SubmitText = styled.Text`
  color: #fff;
`;

export const Loading = styled.ActivityIndicator``