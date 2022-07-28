import Card from "./Card"
import AddCard from "./AddCard"
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {  setListsAndCards} from "../reducers/listSlice";
import { setCardDetail } from "../reducers/cardSlice";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-dnd-beautiful";
import { reorderBoard } from "../reducers/boardSlice";

const List = () => {
  const [trigger, toggleTrigger] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const boardId = useSelector(state => state.board.boardInfo._id)
  const lists = useSelector(state => state.board.boardInfo.lists);
  const listsDetail = useSelector(state => state.list);
  const [isLoading, setIsLoading] = useState(true);
  const {workspaceId} = useParams();


  useEffect(() => {
    getLists().then(() => getCards()).then(() => dispatch(setListsAndCards(returnedLists))).then(() => setIsLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const returnedLists = [];

  const getLists = async () => {
    for (let i = 0; i < lists.length; i++) {
      let list = lists[i];
      const response = await axios.get("http://localhost:8000/lists/" + list)
      returnedLists.push({
        list: response.data,
        cards: []
      })
    }
  }

  const getCards = async () => {
    for (let i = 0; i < returnedLists.length; i++) {
    let cards = returnedLists[i].list.cards
    let returnedCards = []
      for (let i = 0; i < cards.length; i++) {
        let card = cards[i]
        const response = await axios.get("http://localhost:8000/cards/" + card)
        returnedCards.push(response.data)
      }
      returnedLists[i].cards.push(returnedCards)
    }
  }

  let newCards = [];

  if(listsDetail[0]){
    listsDetail.forEach(list => {
      list.cards.forEach(cards => {
        cards.forEach(card => {
          newCards.push(card)
        })
      })
    });
  }

  const getCurrentCard = (id) => {
    const currentCard = newCards.find(card => card._id === id) //reusing Natalie's code from Card.js, should figure out how to pass down currentCard

    getCardDetail(currentCard).then(dispatchCardDetail);
  }

  const members = [];
  const labels = [];
  const activity = [];

  const getCardDetail =  async (currentCard) => {
    
    if (currentCard.members.length) {
      for (let i = 0; i < currentCard.members.length; i++) {
        let member = currentCard.members[i];
        let memberInfo = await axios.get("http://localhost:8000/members/" + member)
        members.push(memberInfo.data)
      }
    }

    if (currentCard.labels.length) {
      for (let i = 0; i < currentCard.labels.length; i++) {
        let label = currentCard.labels[i];
        let labelInfo = await axios.get("http://localhost:8000/labels/" + label)
        labels.push(labelInfo.data)
      }
    }

    if (currentCard.activity.length) {
      for (let i = 0; i < currentCard.activity.length; i++) {
        let activities = currentCard.activity[i];
        let activityInfo = await axios.get("http://localhost:8000/activities/" + activities)
        activity.push(activityInfo.data)
      }
    }
    
  }

  const dispatchCardDetail = () => {
    const detailObj = {
      members: members,
      labels: labels,
      activity: activity
    }
    dispatch(setCardDetail(detailObj));
  }

  const handleOnDragEnd = (result) => {
    switch(result.type){
      case "list":
        const items = Array.from(lists);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        const order = {
          id: boardId,
          order: items
        }
        dispatch(reorderBoard(order))
        break;
      case "card":
        const cardItems = Array.from(newCards);
        const [reorderedCardItem] = cardItems.splice(result.source.index, 1);
        cardItems.splice(result.destination.index, 0, reorderedCardItem);
        break;
      default:
        return
    }
  }

  const renderLists = () => {
    if(!isLoading){
      return listsDetail.map((list, i) => {
        return (
          <Draggable TypeId="list" draggableId={list.list._id.toString()} key={list.list._id} index={i}>
            {(provided) => {
              return (
                <div ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps} className="col list">
                  <div className="list-title">{list.list.title}</div>
                    <Droppable type="card" droppableId={list.list._id}>
                      {(provided) => {
                        return (
                          <div {...provided.droppableProps} ref={provided.innerRef}>
                            {list.cards.map((cards) => {
                              return cards.map((card, index) => {
                                return (
                                  <Draggable TypeId="card" key={card._id} draggableId={card._id.toString()} index={index}>
                                    {(provided) => {
                                      return (
                                        <div ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}className="sm-card" onClick={() => {
                                          getCurrentCard(card._id);
                                          navigate(`/${workspaceId}/boards/${boardId}/cards/${card._id}`, {replace: false})
                                          return toggleTrigger(true);
                                        }}>
                                          {card.title}
                                        </div>
                                      )
                                    }} 
                                  </Draggable>
                                )
                              })
                            })}
                            {provided.placeholder}
                          </div>
                        )
                      }}
                    </Droppable>
                  <div><AddCard list={list.list._id}/></div>
                </div>
              )
            }}
          </Draggable>
        )
      })
    }
  }
  
  if(!isLoading){
    return (
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable type="list" droppableId="list-row" direction="horizontal">
          {(provided) => {
            return (
              <div {...provided.droppableProps} ref={provided.innerRef} className="list-con container row">
                <Card trigger={trigger} toggle={toggleTrigger}/>
                  {renderLists()}
              </div>
            )
          }}
        </Droppable>
      </DragDropContext>
    )
  }

  return (
    <div>
      <img src="https://i.stack.imgur.com/ATB3o.gif" alt="Loading..." />
    </div>
  )
}


export default List;