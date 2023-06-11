import { tweetsData } from '/data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';





document.addEventListener('click', function(event){
    // console.log(event.target.dataset.like);
    if (event.target.dataset.like) {
        handleLikeClick(event.target.dataset.like)
        console.log(event.target.dataset.like);
    }
    else if (event.target.dataset.retweet) {
        handleRetweetClick(event.target.dataset.retweet);
    }else if (event.target.dataset.reply){
        
        handleReplyClick(event.target.dataset.reply)
    }else if (event.target.id === 'tweet-btn'){
        handleTweetBtnClick()
    }
    
})
        


function handleLikeClick(tweetId) {
    const targetTweetObj = tweetsData.filter(tweet => {
       return tweet.uuid === tweetId

    })
    // To access the object out of the array
    for(let tweetObj of targetTweetObj){
        if (tweetObj.isLiked) {
            tweetObj.likes--
        }else{
            tweetObj.likes++
        }
        tweetObj.isLiked = !tweetObj.isLiked
    }
    render()
}

function handleRetweetClick(tweetId){
       const targetReweetObj = tweetsData.filter(tweet => {
       return  tweet.uuid == tweetId
    })[0]
        if(targetReweetObj.isRetweeted){
            targetReweetObj.retweets--
        }else{
            targetReweetObj.retweets++
        }
        targetReweetObj.isRetweeted = !targetReweetObj.isRetweeted
    render()
       
    }

function handleReplyClick(replyId) {
   document.getElementById(`replies-${replyId}`).classList.toggle('hidden') 
}  

function handleTweetBtnClick(){
    const tweetInput = document.getElementById('tweet-input')
    
   if(tweetInput.value){
    tweetsData.unshift({
        handle: `@Scrimba`,
        profilePic: `images/scrimbalogo.png`,
        likes: 0,
        retweets: 0,
        tweetText: tweetInput.value,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: uuidv4() 
    })

    render()
    tweetInput.value = '' 

   }
}
    

function getFeedHtml() {
    let feedHtml = ''
    tweetsData.forEach (tweet => {
        let likeIconClass = ''
        let retweetIconClass = ''
        if (tweet.isRetweeted) {
            retweetIconClass = 'retweeted'
        }
        if (tweet.isLiked) {
            likeIconClass = 'liked'
        }

        let repliesHtml = ''

        if (tweet.replies.length > 0) {
            tweet.replies.forEach(replies =>{
                repliesHtml += `
                <div class="tweet-reply">
    <div class="tweet-inner">
        <img src="${replies.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${replies.handle}</p>
                <p class="tweet-text">${replies.tweetText}</p>
            </div>
        </div>
</div>
                
                `
            })
        }

        feedHtml += `
        
        <div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                <i class="fa-solid fa-heart ${likeIconClass}" data-like="${tweet.uuid}"></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet="${tweet.uuid}"></i>
                    ${tweet.retweets}
                </span>
            </div>   
        </div>            
    </div>
    <div class="hidden" id="replies-${tweet.uuid}">
        ${repliesHtml}
        <!-- REPLIES HERE -->
    </div> 
</div>        
`
    })

return feedHtml
}

        
function render(){
     document.getElementById('feed').innerHTML = getFeedHtml()
}       
render()    
    
  
        
        




