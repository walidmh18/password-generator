const firstPage = document.querySelector('.firstPage')
const secondPage = document.querySelector('.secondPage')

function moveToSecondPage(){
   firstPage.style.display = 'none'
   secondPage.style.display = 'block'
}

 
// copy icon
const copyToClipboard = document.getElementById('copyToClipboard')

const copyAnimation =  lottie.loadAnimation({
      container: copyToClipboard,
      path: '../assets/Copy icon/copy.json',
      autoplay: false,
      loop: false,
      renderer: 'svg'
   })
let copyAnimDir = 1
copyToClipboard.addEventListener('mouseenter', ()=>{
   copyAnimation.setDirection(copyAnimDir)
   copyAnimation.play()
   copyAnimDir = -1
})

copyToClipboard.addEventListener('mouseleave', () => {
   copyAnimation.setDirection(copyAnimDir)
   copyAnimation.play()
   copyAnimDir = 1
})

// copy to clipboard
const genOutput = document.getElementById('genOutput')
const genOutputContainer = document.getElementById('genOutputContainer')

function copyToClipBoard(){
   navigator.clipboard.writeText(genOutput.innerText)
   genOutputContainer.classList.add('active')
   setTimeout(() => {
      genOutputContainer.classList.remove('active')
      
   }, 1500);
}

// displaying length 

const passwordLengthOutput = document.getElementById('passwordLengthOutput')
const passwordLengthInp = document.getElementById('passwordLength')

passwordLengthOutput.innerHTML = passwordLengthInp.value
passwordLengthInp.addEventListener('input', ()=>{
   passwordLengthOutput.innerHTML = passwordLengthInp.value

})

// checkboxes
const settingsInpArr = [...document.querySelectorAll('.settingsInp')]
   // arrays
   let uppercase = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
   let lowercase = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
   let numbers = [1,2,3,4,5,6,7,8,9]
   let symbols = ['!','@','#','$','%','&']

   // main object
   let settings = {
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: true
   }
  
   // loop
   settingsInpArr.forEach(setting =>{
      setting.addEventListener('input',()=>{
         let id = setting.id
         if (setting.checked) {
            for (const key in settings) {
               if (key === id) {
                  settings[id] = true                  
               }
            }
              
         } else if(!setting.checked) {
            for (const key in settings) {
               if (key === id) {
                  settings[id] = false
               }
              
            
         }
      }
   })
   
   })



   // generating
   let largeArr = []
   function generate() {
      // filling the array 
      const errContainer = document.querySelector('.err')
      errContainer.innerHTML = ''
      let stopArr = []
      for (const key in settings) {
         if (key == 'uppercase') {
            if (settings[key] == true) {
               largeArr.push(uppercase)
            } 
         } else if (key == 'lowercase') {
            if (settings[key] == true) {
               largeArr.push(lowercase)
            } 
         } else if (key == 'numbers') {
            if (settings[key] == true) {
               largeArr.push(numbers)
            } 
         } else if (key == 'symbols') {
            if (settings[key] == true) {
               largeArr.push(symbols)
            } 
         } 
         if (settings[key] == true) {
            stopArr.push(key)
         }
         
      }

      console.log(stopArr.length);
      if (stopArr.length < 1) {
         let inputsErr = document.createElement('p')
         inputsErr.classList.add('inputsErr')
         inputsErr.innerHTML = 'Please Select At Least One Parameter'
         errContainer.innerHTML = inputsErr.innerHTML
         return
      } 
      console.log(largeArr);
      
      // password length
      const lengthInp = document.getElementById('passwordLength')
      let length = lengthInp.value
      // making the actual password
      let output = {password:''}
      for (let i = 0; i < length; i++) {
         let random1 = Math.floor(Math.random()* largeArr.length)
         let random2 = Math.floor(Math.random()* largeArr[random1].length)
         output.password+= largeArr[random1][random2]
      }
      console.log(output.password);
      

      // displaying result
      genOutput.innerText = output.password



      // getting strength

      let strengthScore = {
         length: 0,
         settings:''

      }
      // length score
      if (length >= 6 && length < 8) {
         strengthScore.length = 1
      } else if (length >= 8 && length < 11) {
         strengthScore.length = 3
         
      }else if (length >= 11 && length < 14) {
         strengthScore.length = 5
         
      }else if (length >= 14 && length <= 16) {
         strengthScore.length = 7
         
      }
      
      // settings score
      strengthScore.settings = largeArr.length
      console.log(strengthScore.settings);
      largeArr = []

      // total score
      let strength = strengthScore.length + strengthScore.settings
      console.log(strength);

      // displaying strength score
      let strengthStatus = ''
      const strengthStatusOutput = document.getElementById('strengthStatus')
      const coloredStrengthOutput = document.querySelector('.strengthDisplay')




      if (strength <= 3) {
         strengthStatus = 'weak'
      } else if (strength > 3 && strength < 7) {
         strengthStatus = 'medium'
      } else if (strength >= 7 && strength <= 10) {
         strengthStatus = 'strong'
      } else if (strength > 10 ) {
         strengthStatus = 'secure'
      }
      console.log(strengthStatus);
      coloredStrengthOutput.classList.remove('weak', 'medium', 'strong', 'secure')
      coloredStrengthOutput.classList.add(strengthStatus)
      strengthStatusOutput.innerText = strengthStatus
   }

   
   
   























