console.log("Email Writer Console Working");

function getEmailContent(){
    const selectors =[
        '.h7',
        '.a3s.aiL',
        '.gmail_quote',
        '[role="presentation"]'
    ];

    for(const selector of selectors){
        const content = document.querySelector(selector);
        if(content){
            return content.innerText.trim();
        }
    }
    return '';
}

function findComposeToolbar(){
    const selectors =[
        '.btC',
        '.aDh',
        '[role="toolbar"]',
        '.gU.Up'
    ];

    for(const selector of selectors){
        const toolbar = document.querySelector(selector);
        if(toolbar){
            return toolbar;
        }
    }
    return null;
}

function createAiButton(){
    const button = document.createElement('div');
    button.className='T-I J-J5-Ji aoO v7 T-I-atl L3 T-I-JW';
    button.style.marginRight='8px';
    button.innerHTML='Ai Reply';
    button.setAttribute('role','button');
    button.setAttribute('data-tooltip','Generative Ai Reply');
    return button;   // ✅ fixed
}

function injectButton(){
    console.log("Pakad Liya");

    const existingButton = document.querySelector('.ai-reply-button');
    if(existingButton) existingButton.remove();

    const toolbar = findComposeToolbar();
    if(!toolbar){
        console.log("Toolbar not found");
        return;
    }

    console.log("Found the Button And Creating the Ai Button ");

    const button = createAiButton();
    button.classList.add('ai-reply-button');   // ✅ fixed

    button.addEventListener('click', async ()=>{
        try {
            button.innerHTML='Generating....';
            button.disabled=true;

            const emailContent = getEmailContent();

            const response = await fetch('http://localhost:8080/v1/email',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',   // ✅ fixed
                },
                body:JSON.stringify({
                   emailContent: emailContent,
                   tone:"professional"
                })
            });

            if(!response.ok){
                throw new Error('Api Request Failed');
            }

            const generatedReply = await response.text();

            const composeBox = document.querySelector('[role="textbox"][g_editable="true"]'); // ✅ fixed

            if(composeBox){
                composeBox.focus();
                document.execCommand('insertText', false, generatedReply);
            }else{
                console.error('composeBox Was Not Found ');
            }

        } catch (error) {
            console.log(error);
            console.error('Failed To generate the reply');
            alert('failed to generate reply');
        }  
        finally{
            button.innerHTML='Ai Reply';
            button.disabled=false;
        }
    });

    toolbar.insertBefore(button, toolbar.firstChild);
}

const observer = new MutationObserver((mutations)=>{
    for(const mute of mutations){
        const addedNodes = Array.from(mute.addedNodes);

        const hasComposeElements = addedNodes.some(node =>
            node.nodeType===Node.ELEMENT_NODE && 
            (node.matches('.aDh,.btC,[role="dialog"]') || 
             node.querySelector('.aDh,.btC,[role="dialog"]'))
        );

        if(hasComposeElements){
            console.log("Compose Window Detected");
            setTimeout(injectButton, 500);
        }
    }
});

observer.observe(document.body,{
    childList:true,
    subtree:true
});