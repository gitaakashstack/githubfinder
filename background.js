let client_id="b42a826f92719cd0287e";
let client_secret="0ae4ef64c6a6beebf6b82664ad5d17cbba33bf46";
let repos_count=5;
let repos_sort='updated-asc'
window.onload=function(){
    document.querySelector("input").addEventListener("input",callback);
}
function callback(){
    let inpt=document.querySelector("input").value.trim();
    if(inpt!="")
    {
        getUser(inpt).then(
            userprofile=>{
                if(userprofile.message=="Not Found")
                {
                    console.log("HERR");
                    document.querySelector(".warning").style.display="block";
                    setTimeout(()=>document.querySelector(".warning").style.display="none",2000);
                }
                else{
                    showProfile(userprofile);
                }
            }
        );
        getRepos(inpt).then(
            repos=>{
                if(repos.message=="Not Found")
                {}
                else
                {
                    console.log(repos);
                    showRepos(repos);
                }
            }


        );  
    }
    else
    {
        let node1=document.getElementById("profile");
        let node2=document.getElementById("repos");
        if(node1)
        {      node1.classList.remove("profilegist"); 
               node1.innerHTML="";
        }
        if(node2)
            node2.innerHTML="";
        document.querySelector("h2").remove();
    }
}
async function getUser(user) {
    const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${client_id}&client_secret=${client_secret}`);

    const profile = await profileResponse.json();

    return profile;
}
async function getRepos(user){
    const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${repos_count}&sort=${repos_sort}&client_id=${client_id}&client_secret=${client_secret}`);
    const repos=await repoResponse.json();
    return repos;
}
function showProfile(up){
    document.getElementById("profile").classList.add("profilegist");
    document.getElementById("profile").innerHTML=`<div>
                                                        <img src=${up.avatar_url} alt="Image Here">
                                                        <p id="viewprofile"><a href=${up.html_url} target="_blank">View Profile</a></p>
                                                  </div>
                                                  <div>
                                                        <ul>
                                                            <li>Public Repos:${up.public_repos}</li>
                                                            <li>Public Gists:${up.public_gists}</li>
                                                            <li>Followers:${up.followers}</li>
                                                            <li>Following:${up.following}</li>
                                                        </ul>
                                                        <ul>
                                                            <li>Comapny:${up.company}</li>
                                                            <li>Website/Blog:${up.blog}</li>
                                                            <li>Location:${up.location}</li>
                                                            <li>Member Since:${up.created_at}</li>
                                                        </ul>
                                                  </div>`
     /*Another method is instead of adding class to div element with id=profile, we can put the div element with class=profilegist inside the div 
    with id=profile. So innerHTML will be having one more div with class=profilegist enclosing the entire content which is currently in innerHTML
    document.getElementById("profile").innerHTML=`<div class="profilegist"><div>
                                                        <img src=${up.avatar_url} alt="Image Here">
                                                        <p id="viewprofile"><a href=${up.html_url} target="_blank">View Profile</a></p>
                                                    </div>
                                                    <div>
                                                        <ul>
                                                            <li>Public Repos:${up.public_repos}</li>
                                                            <li>Public Gists:${up.public_gists}</li>
                                                            <li>Followers:${up.followers}</li>
                                                            <li>Following:${up.following}</li>
                                                        </ul>
                                                        <ul>
                                                            <li>Comapny:${up.company}</li>
                                                            <li>Website/Blog:${up.blog}</li>
                                                            <li>Location:${up.location}</li>
                                                            <li>Member Since:${up.created_at}</li>
                                                        </ul>
                                                    </div></div>`*/

}
function showRepos(repos)
{
    let heading=document.createElement("h2")
    heading.innerHTML="Latest Repos";
    if(document.querySelector("h2"))
        document.querySelector("h2").remove();
    document.body.insertBefore(heading,document.getElementById("repos"));
    let repodetails=""
    repos.forEach(function(repo){
        repodetails+=`<div class="allrepos">
                            <p><a href="${repo.html_url}" target="_blank">${repo.name}</a></p>
                            <ul>
                                <li>Stars:${repo.stargazers_count}</li>
                                <li>Watchers:${repo.watchers_count}</li>
                                <li>Forks:${repo.forks_count}</li>
                            </ul>
                      </div>`

    })//Here I have adopted the method of .innerHTML which is commented in showProfile() i.e. wrapping the entire dynamic content inside a div. So
    //here div with id repos is just for wrapping, it serves no other purpose.
    document.getElementById("repos").innerHTML=repodetails;
}