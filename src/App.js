// eslint-disable jsx-ally/aria-role  import './App.css';
import React, { useState } from 'react';

function App() {


  // your data goes here {state}

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newTopic, setNewTopic] = useState(""); // string h   
  //const [addedTopic, setaddedTopic] = useState([]);   //new htaya &  [] h ,string nhi  
  //const [showAgendaBlock, setshowAgendaBlock] = useState(false);
  const [addedAgenda, setAddedAgenda] = useState([
    {
      title: "Angular",
      description: "Some description about Angular",
      topics: ["Introduction","Typescript","Why Angular?","Understanding Versions","Fundamental"]
    },
    {
      title: "Vue",
      description: "Some description about Vue",
      topics: ["Introduction","Javascript","Why Vue?","Vue Bindings","Component Interaction"]
    }
  ]);
  //your methods go here

  const [topicsArr,setTopicsArr] = useState([]); // ye array h jisme topics add honge
  const [showAgendaBlock, setShowAgendaBlock] = useState(false); // ye boolean h jisse show/hide krna h
 
  const ChangeFn = e => {
    const {value,name} = e.target;
    switch(name) {
      case 'newTitle':
        setNewTitle(value);
        break;
      case 'newDescription':
        setNewDescription(value);
        break;
      case 'newTopic':
        setNewTopic(value);
        break;

      default:
        break;
    }
  }
    
  const topicFun = () => {
    if(newTopic.trim() !== "") {
      setTopicsArr(prevTopics => [...prevTopics, newTopic]);
      setNewTopic("");
    }
  }


  const agendaFun = () => {
    if(newTitle.trim() !== "" && newDescription.trim() !== "" && topicsArr.length > 0) {
      const agenda = {
        title: newTitle,
        description: newDescription,
        topics: topicsArr
      };
      setAddedAgenda(prevAddedAgenda => [...prevAddedAgenda, agenda]);
      setNewTitle("");
      setNewDescription("");
      setNewTopic("");
      setTopicsArr([]);
    }
  };

  const formCheck = e => {
    e.preventDefault();
  };


  const checkAgendaFun = () => {
    setShowAgendaBlock(prevShowAgendaBlock => !prevShowAgendaBlock);
  };

  




  return (
    <div>
      <h1 className='mx-5 mb-5'>Agenda Manager</h1>
      {/* show/hide this following add agenda template*/}
      {!showAgendaBlock && (              //1.177 niche wale div m 
      <div className='container' role="addAgenda">
        <button className='btn btn-info' role='goToView' onClick={checkAgendaFun}>
          Click To View Agenda
        </button>
        <form onSubmit={formCheck}>    {/* 2.taki form submit hote hi page fresh na ho jaye */} 
          <div className='my-3'>
          <label className='form-label'>Title</label>
          {/* title */}
          <input 
            type="text"
            name='newTitle'
            placeholder='Enter the title'
            className='form-control'
            role='inputTitle'
            value={newTitle}
            onChange={ChangeFn}  //3.change event lgaya = handleChangeGn ko call kiya
           />

          <small className='text-danger' data-testid="invalidTitle">
            {/*   show empty string if title input is valid else show "Title is required"  */}
           
           
           
            {newTitle.trim().length === 0 && "Title is required"}       {/*4. validation msg tabhi show krna h jb koi galti ho (text field m mene kuch dala nhi ), otherwise show nhi krna h msg */}
          
          </small>
          </div> 
          <div className='my-3'>
            <label className='form-label'>Description</label>
            {/* description */}
            <input 
              type="text"
              name="newDescription"
              placeholder='Enter the description'
              className='form-control'
              role='inputDescription'
              value={newDescription} 
              onChange={ChangeFn}  //5.change event lgaya = handleChangeGn ko call kiya
            />

            <small className='text-danger' data-testid="invalidDescription">
              {/*   show empty string if description input is valid  else show "Description is required"   */}
             
             
             
              {newDescription.trim().length === 0 && "Description is required"}      {/* /6. validation msg tabhi show krna h jb koi galti ho (text field m mene kuch dala nhi ), otherwise show nhi krna h msg   */}
            </small>
          </div>
          <div className='my-3 w-50'>
            <label className='form-label'>Enter topic</label>
            {/* topic */}
            <input 
              type="text"
              name='newTopic'
              placeholder='Enter the topic'
              className='form-control'
              role='inputTopic'
              value={newTopic} 
              onChange={ChangeFn}  //7.change event lgaya = handleChangeGn ko call kiya
            />

            <small className='text-danger' data-testid="invalidTopic">
              {/*  show empty string if topic input is valid  else show "Topic is required"   */}
             
             
             
              {newTopic.trim().length === 0 && topicsArr.length === 0   && "Topic is required"}     {/*  /8. + ak extra condition h edr  */}
            </small>
            </div>
            {/* on click should add topics and disable the button if invalid topic */}    
            <button className='btn btn-success addAlign' role='addTopicBtn' onClick={topicFun} disabled={newTopic.trim() === ""}>    {/*   /8. newTopic.length = 0 rhe tb ye disable rkhna h  */} 
              + Add Topic
            </button>
            {/* on click should add agenda details and disable the button if invalid in */}
            <button 
              className='btn btn-success submitAlign' 
              role='addAgendaBtn' 
              onClick={agendaFun} 
              disabled={newTitle.trim() === "" || newDescription.trim() === "" || topicsArr.length === 0}  //9. ye button tbhi enable hoga jb title, description, topic tino m kuch to hoga
              >
                Submit Agenda
              </button>
        </form>

        {/* display the list of topics added using li */}
        {topicsArr.length === 0 &&  (          //9.condition   
        <div className='text-danger ml-2 mt-5' data-testid="noTopicsMsg">
            No Topics Added
        </div>
      )}
        {/* display the list of topics added using li*/}
        {topicsArr.length > 0 &&  (      //10.condition  
        <div className='card my-3'>
          <div className="card-header"> Added Topics </div>
            <div className="card-body">
              <ul className="list-group">
                {topicsArr.map((topic,index) => (    //11. loop lgaya
                <li className="list-group-item" role="topicList" key={index}>   {/*  /12.react m hr ak element unique bnana h - key-{topic}  */}
                   {topic}         {/*  //13.under curly braces topic ko define kr denge to topic print hota jayega  (topics list) */} 
                </li>
                ))}

              </ul>
            </div>
            <div className="card-footer">Refer the topics you added</div>
        </div>
      )}
      </div>
      )}
      {/* show/hide this following view agenda template */}
      {showAgendaBlock && (           
      <div className="container" role="viewAgenda"> 
        <button className="btn btn-info" role="goToAdd" onClick={checkAgendaFun}> 
          Click To Add Agenda
        </button>
        {/* iterate the agenda details to diplay(in cards) */}
        {addedAgenda.map((agenda,index) => (     
        <div className='card my-3' role='cards' key={index}>       
          <div className="card-header">{agenda.title} {/* title */} </div>  
            <div className="card-body">
              <ul className='list-group'>
                {/* iterate the topics to display (in list items) */}
                {agenda.topics.map((topic, index) => (   
                <li className='list-group-item' key={index}>   
                  {topic}   {/* topics */}    
                </li>
                ))}
              </ul>
             </div>
            <div className="card-footer">{agenda.description}</div>    
        </div>
        ))} 
      </div>
      )}
    </div>
  );
}

export default App;
