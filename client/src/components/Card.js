import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { useState } from "react";
import { random_rgba } from "./BoardList";
import { editCardTitle } from "../reducers/listSlice";
import { addCommentToCard, activityAdded, editToComment, addDescription} from "../reducers/cardSlice";




const Card = ({trigger, toggle}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {cardId} = useParams();
  const {boardId} = useParams();
  const lists = useSelector(state => state.list);
  const card = useSelector(state => state.card)
  const members = useSelector(state => state.card.members);
  const activities = useSelector(state => state.card.activity)
  const currentMember = useSelector(state => state.login.name)
  const currentMemberId = useSelector(state => state.login._id)
  const detailsAreLoaded = useSelector(state => state.card.detailsLoaded)
  const [descriptionInput, setDescriptionInput] = useState("");
  const [clickOnComment, setClickOnComment] = useState(false)
  const [commentInput, setCommentInput] = useState("");
  const [clickOnDescription, setClickOnDescription] = useState(false);
 


  const newCards = [];
  if(lists[0]){
    lists.forEach(list => {
      list.cards.forEach(cards => {
        cards.forEach(card => {
          newCards.push(card)
        })
      })
    });
  }

  const currentCard = newCards.find(card => card._id === cardId)

  const addComment = () => {
    const data = {
      boardId: boardId,
      cardId: cardId,
      member: {
        name: {
          first: currentMember.first,
          last: currentMember.last
        }
      }
      ,
      activity: {
        member: currentMemberId,
        comment: {
          text: commentInput,
          edited: false
        },
        activityType: "comment"
      }
    };

    dispatch(addCommentToCard(data)).then(() => dispatch(activityAdded(true)))

    setCommentInput("")
  }

  const saveDescription = (e) => {
    if (card.description) {
      const description = descriptionInput;
      const cardObj = {...card, description: description, _id: cardId};
      dispatch(addDescription(cardObj));
      dispatch(activityAdded(true))
      const input = e.target.parentElement.parentElement
      input.style.display = "none"
      const div = e.target.parentElement.parentElement.parentElement.previousElementSibling
      div.style.display = "block"
    }
    else {
      const description = descriptionInput;
      const cardObj = {...card, description: description, _id: cardId};
      dispatch(addDescription(cardObj));
      dispatch(activityAdded(true))
    }
    
  }
  const renderMembers = () => {
      if(members){
        return members.map((member, i) => {
          const values = random_rgba();
          const randomColor = 'rgba(' + values + '1)'
          const colorStyle = { backgroundColor: randomColor };
  
          return (
            <div key={i} onClick={() => navigate(`../${member._id}`, {replace: true})} style={colorStyle} className="member-style" >{member.name.first[0]}{member.name.last[0]}</div>
          )
        })
    }
    
  }

  const renderDescription = () => {
    if (card.description) {
      return (
        <div>
          <div className="description-div" style={{display: "block"}}>
            <div className="card-edit">
              <div className="description-label">Description</div>
              <img className="edit-card" src="https://cdn4.iconfinder.com/data/icons/evil-icons-user-interface/64/pen-1024.png" alt="edit-title" onClick={editDescription}/>
            </div>
            <div className="card-description">{card.description}</div>
          </div>
          <form style={{display: "none"}}>
            <div className="form-row description-form">
                <label for="description" className="description-label">Description</label>
                <textarea value={descriptionInput} className="form-control" id="description" rows={clickOnDescription ? "3" : "1"} placeholder="Enter a more detailed description here" onClick={() => setClickOnDescription(true)} onChange={(e) => setDescriptionInput(e.target.value)}></textarea>
                <div className="comment-buttons">
                <button type="button" className={clickOnDescription ? "btn btn-outline-secondary add-description" : "hide-form"} onClick={saveDescription}>Save</button>
                <button type="button" className={clickOnDescription ? "btn btn-outline-secondary add-description" : "hide-form"} onClick={() => {setClickOnDescription(false);
                setDescriptionInput("")}}>Exit</button>
              </div>
            </div>
          </form>
        </div>
          
        
        
      )
    }
    else {
      return renderDescriptionForm()
    }
     
  }

  const editDescription = (e) => {
   
    const div = e.target.parentElement.parentElement;
    div.style.display = "none";

    const input = e.target.parentElement.parentElement.nextElementSibling
    input.style.display = "block"
    
    
    
  }

  const renderDescriptionForm = () => {
    
    return (
      <form>
      <div className="form-row description-form">
          <label for="description" className="description-label">Description</label>
          <textarea value={descriptionInput} className="form-control" id="description" rows={clickOnDescription ? "3" : "1"} placeholder="Enter a more detailed description here" onClick={() => setClickOnDescription(true)} onChange={(e) => setDescriptionInput(e.target.value)}></textarea>
          <div className="comment-buttons">
          <button type="button" className={clickOnDescription ? "btn btn-outline-secondary add-description" : "hide-form"} onClick={saveDescription}>Save</button>
          <button type="button" className={clickOnDescription ? "btn btn-outline-secondary add-description" : "hide-form"} onClick={() => {setClickOnDescription(false);
          setDescriptionInput("")}}>Exit</button>
        </div>
      </div>
    </form>
    )
  }

  const editComment = (e) => {
    const div = e.target.parentElement.parentElement.childNodes[0];
    const input = e.target.parentElement.parentElement.childNodes[1];
    div.style.display = "none";
    input.style.display = "block"
  }

  const handleCommentEnter = (e) => {
    if (e.key === 'Enter') {
      const originalComment = e.target.previousElementSibling.innerHTML;
      const sliceComment = originalComment.split("commented: ");
      const comment = sliceComment[sliceComment.length - 1];
      const originalDate = e.target.nextElementSibling.childNodes[0].innerHTML;
      const newDate = new Date(originalDate);
      const formattedDate = newDate.toISOString();
      const shortDate = formattedDate.substring(0, formattedDate.length - 8)
      const commentToBeChanged = activities.find((activity) => activity.comment.text === comment && activity.date.substring(0, activity.date.length - 8) === shortDate);
      const commentIndex = activities.indexOf(commentToBeChanged);

      const newComment = {...commentToBeChanged, comment: {text: e.target.value, edited: true}, index: commentIndex, date: new Date()}
      console.log(newComment)
      dispatch(editToComment(newComment));

      const input = e.target
      const div = e.target.previousElementSibling
      console.log(div)
      input.style.display = "none";
      div.style.display = "block";
      
    }
  }

  const renderActivityBody = () => {
    if (detailsAreLoaded && activities.length) {
      // eslint-disable-next-line array-callback-return
      return activities.map((activity) => {
        if (activity.activityType === "comment") {
          if (activity.member) {
            return (
              
              <div className="comment-div">
                <div className="comment">{activity.member.name.first + " " + activity.member.name.last + " commented: " + activity.comment.text}</div>
                <input onKeyUp={handleCommentEnter} className="comment-input" style={{display: "none"}} />
                <div className="edit-comment-div">
                  <div className="comment-date">{renderDate(activity.date)}</div>
                  <button className="comment-edit-button" onClick={editComment}>Edit</button>
                </div>
                
              </div>
            )
          }
          else {
            return (
              <div className="comment-div">
                <div className="comment">{"Unknwon member commented: " + activity.comment.text}</div>
                <input onKeyUp={handleCommentEnter(activity)} className="comment-input" style={{display: "none"}} />
                <div className="edit-comment-div">
                  <div className="comment-date">{renderDate(activity.date)}</div>
                  <button className="comment-edit-button" onClick={editComment}>Edit</button>
                </div>
              </div>
              
            )
          }
        }
      })
    }
  }

  const renderDate = (date) => {
    if (date) {
      const newDate = new Date(date).toLocaleDateString('en-us', {month:"short", day:"numeric", year:"numeric", hour:"numeric", minute:"numeric"}) 
      return newDate
    }
    else {
      return "Just now"
    }
  
  }

 

  const renderActivity = () => {
    return (
      <div className="activity">
        <div className="activity-label">Activity</div>
        <textarea className="form-control" id="description" rows="1" placeholder="Add comment" onClick={() => setClickOnComment(true)} onChange={(e) => setCommentInput(e.target.value)} value={commentInput}/>
        <div className="comment-buttons">
          <button type="button" className={clickOnComment ? "btn btn-outline-secondary add-description" : "hide-form"} onClick={addComment}>Save</button>
          <button type="button" className={clickOnComment ? "btn btn-outline-secondary add-description" : "hide-form"} onClick={() => setClickOnComment(false)}>Exit</button>
        </div>
       <div className="activity-body">{renderActivityBody()}</div>
      </div>
    )
  }

  const editTitle = (e) => {
    const div = e.target.previousElementSibling;
    const input = e.target.nextSibling;
    input.value = div.innerHTML;
    div.style.display = "none";
    input.style.display = "block";
    input.focus()
  }

  const handleTitleEnter = (e) => {
    const div = e.target.previousElementSibling.previousElementSibling;

    if (e.key === "Enter") {
      const newTitle = e.target.value;
      e.target.style.display = "none";
      div.style.display = "block";
      const listCardIsIn = lists.find((list) => list.cards[0].find(card => card._id === cardId))
      const listIndex = lists.indexOf(listCardIsIn)
      const card = listCardIsIn.cards[0].find(card => card._id === cardId)
      const cardIndex = listCardIsIn.cards[0].indexOf(card);
      const newCard = {...card, title: newTitle, listIndex: listIndex, cardIndex: cardIndex}

      dispatch(editCardTitle(newCard))
    }
  }
   
  return (trigger) ? (
    <div className="card list-card" id="card-component">
      <div className="list-card-inner">
        <img onClick={() => {
          toggle(false);
          navigate(-1);
          setClickOnDescription(false);
          setClickOnComment(false);
          setDescriptionInput("");
          }} className="close-card" src="https://cdn0.iconfinder.com/data/icons/octicons/1024/x-512.png" alt="close card"/>
        <div className="card-title">
          <h1>{currentCard.title}</h1>
          <img className="edit-title"  onClick={editTitle} src="https://cdn4.iconfinder.com/data/icons/evil-icons-user-interface/64/pen-1024.png" alt="edit-title"/>
          <input onKeyUp={handleTitleEnter} className="list-title-input" style={{display: "none"}} />
        </div>
        <div className="members-dropdown board-members">
          <p>Members: </p>
          {renderMembers()}
        </div>
        <div>{renderDescription()}</div>
        <div>{renderActivity()}</div>
      </div>
    </div>
  ) : ""
}

export default Card;