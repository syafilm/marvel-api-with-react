import React, { Fragment, useEffect } from 'react';
import { Input, Button } from 'components';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';
import { useQuery } from 'utils';
import { ApiSeries, ApiComics, ApiStories } from 'api';

const Wrapper = styled.div`
  max-width: ${props => props.result ? `1140px` : `720px`};
  margin: 0 auto;
  margin-top: 5rem;
`

const Start = styled.div`
  display: flex;
  flex-direction: column;
  > h2{
    font-size: 20px;
    margin-bottom: 0;
  }
  > span{
    color: rgba(0,0,0,0.3);
  }
  > button{
    margin-top: 1.5rem;
  }
`

const Questions = styled.div`
  display: flex;
  flex-direction: column;
  input{
    &:first-of-type{
      margin-bottom: 2rem;
    }
  }
  > button{
    margin-top: 1.5rem;
  }
`

const Results = styled.div`
  display: block;
`

const Card = styled.div`
  position: relative;
  flex: 0 0 auto;
  width: 25%;
  display: block;
  max-width: 100%;
  margin-bottom: 30px;
  > div{
    box-shadow: 0px 6px 20px rgb(0 0 0 / 6%);
    margin-right: 30px;
    border-radius: 5px;
    background-color: white;
    > span{
      padding: 10px;
      display: block;
    }
  }
`

const ResultWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1.5rem;
`

const Home = ({}) => {
  const query = useQuery();
  const history = useHistory();
  const { page = 'start' } = query;
  const [activePage, setActivePage] = React.useState(page);
  const [result, setResult] = React.useState(false);
  const [data, setData] = React.useState({
    series: [],
    comics: [],
    stories: [],
  });
  const [type, setType] = React.useState('');
  const [limit, setLimit] = React.useState(50);
  const [questions, setQuestions] = React.useState({
    firstQuestions: '',
    firstQuestionsError: '',
    secondQuestions: '',
    secondQuestionsError: '',
  });
  
  const handleInputChange = (type) => (e) => {
    const { value } = e.target
    setQuestions(prev => ({...prev, [type]: value}));
  }

  const setPage = (type, answer, limit) => () => {
    switch(type) {
      case 'questions':
        setActivePage('questions');
        history.push('/?page=questions');
        // code block
        break;
      case 'result':
        setActivePage('result');
        setResult(true);
        resultData(answer, limit);
        history.push('/?page=result');
        break;
      default:
        setActivePage('start');
        history.push('/');
        // code block
    }
  }

  const resultData = (answer, limit) => {
    if((answer.includes('comics') || 
      answer.includes('comic'))){
      setType('comics');
      getComics(limit)
    }else if((answer.includes('series') || 
      answer.includes('series'))){
      setType('series');
      getSeries(limit)
    }else if((answer.includes('stories') || 
      answer.includes('story'))){
      setType('stories');
      getStories(limit)
    }
  }

  const getSeries = async(limit) => {
    try {
      const {data} = await ApiSeries.getListSeries(limit)
      const {results} = data.data
      if(results.length > 0){
        setData(prev => ({...prev, series: results}))
      }
    } catch (e) {
      console.log(e)
    }
  }

  const getComics = async(limit) => {
    try {
      const {data} = await ApiComics.getListComics(limit)
      const {results} = data.data
      if(results.length > 0){
        setData(prev => ({...prev, comics: results}))
      }
    } catch (e) {
      console.log(e)
    }
  }

  const getStories = async(limit) => {
    try {
      const {data} = await ApiStories.getListStories(limit)
      const {results} = data.data
      if(results.length > 0){
        setData(prev => ({...prev, stories: results}))
      }
    } catch (e) {
      console.log(e)
    }
  }

  const checkValidExist = value => {
    let isValid;
    if (/^\s*$/.test(value)) {
      isValid = false;
    } else if (/^\d+$/.test(value)) {
      isValid = value > 0;
    } else if (/^\s+$/.test(value)) {
      isValid = value.length > 0;
    } else {
      isValid = !!value;
    }
  
    return isValid;
  };
  

  React.useEffect(() => {
    if(activePage === 'result' && !result){
      setActivePage('questions')
      history.push('/?page=questions');
    }
  }, [page])

  console.log(data[type], 'data');

  return(
    <Wrapper result={(activePage === 'result' && result)}>
      {activePage === 'start' && (
          <Start>
            <h2>Hello there, click this button below to start the question. </h2>
            <span>There are two questions you need to answer, but it's not a hard question, a funny question that generate your marvel characther prefrence</span>
            <Button onClick={setPage('questions')} style={{width: '100px'}}>
              Start
            </Button>
          </Start>
      )}
      {activePage === 'questions' && (
        <Questions>
          <Input
            label="What is your name?"
            placeholder={'Iron'}
            value={questions.firstQuestions}
            type='text'
            onChange={handleInputChange('firstQuestions')}
          />
          <Input
            label="What do you like more: comics, series or stories?"
            placeholder={'comics, series, or stories'}
            value={questions.secondQuestions}
            type='text'
            onChange={handleInputChange('secondQuestions')}
          />
          <Button onClick={setPage('result', questions.secondQuestions, limit)} style={{width: '100px'}}>
            Check
          </Button>
        </Questions>
      )}

      {
        activePage === 'result' && result && (
          <Results>
            Hello, {questions.firstQuestions}
            {
              ((questions.secondQuestions.includes('stories') || 
              questions.secondQuestions.includes('story')) ||
              (questions.secondQuestions.includes('comics') || 
              questions.secondQuestions.includes('comic')) ||
              (questions.secondQuestions.includes('series') || 
              questions.secondQuestions.includes('series')))&&
              <ResultWrapper>
                {typeof data[type] !== 'undefined' && data[type].map((any) => {
                  console.log(any, 'any')
                  return(
                    <Card key={any.id}>
                      <div>
                        {checkValidExist(any.thumbnail) ?
                          any.thumbnail.path.includes('not_available') ?
                          null
                          :
                          <img style={{width: '100%', height: 'auto'}} src={`${any.thumbnail.path}.${any.thumbnail.extension}`} />
                          :
                          null
                        }
                        <span>{any.title}</span>
                      </div>
                    </Card>
                  )
                })}
              </ResultWrapper>
            }
          </Results>
        )
      }
    </Wrapper>
  )
}

export default Home
