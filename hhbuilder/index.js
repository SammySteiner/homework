// Your code goes here

var addButton = document.getElementsByClassName('add')[0]

addButton.addEventListener('click', function(event) {
  event.preventDefault()
  addHouseholdMember()
})

addHouseholdMember = function(){
  var age = document.getElementsByName('age')[0].value
  var relationship = document.getElementsByName('rel')[0].value
  var smoker = document.getElementsByName('smoker')[0].checked
  if (validate(age, relationship)) {
    document.getElementsByClassName('household')[0].innerHTML += `<li>Age: ${age}, Relationship: ${relationship}, Smoker: ${smoker} <button onClick = deleteMember(event)>delete</button></li>`
    document.getElementsByName('age')[0].value = ''
    document.getElementsByName('rel')[0].value = ''
  } else {
    addErrorMessage(age)
  }
}

validate = function(age, relationship){
  var ageNumber = parseInt(age, 10)
  if (ageNumber && ageNumber > 0 && relationship) {
    return true
  }
}

addErrorMessage = function(age){
  if (!age || parseInt(age, 10) <= 0) {
    alert('Your entry was not submitted because the age was not valid. Age is required and must be greater than 0')
  } else {
    alert('Your entry was not submitted because the relationship was not included')
  }
}

deleteMember = function(event) {
  event.target.parentElement.remove()
}


document.getElementsByTagName('form')[0].addEventListener('submit', function(event){
  submitHousehold(event)
  alert('Your form was successfully submitted')
},
)

submitHousehold = function(event) {
  event.preventDefault()
  var age = document.getElementsByName('age')[0].value
  var relationship = document.getElementsByName('rel')[0].value
  if (validate(age, relationship)) {
    addHouseholdMember()
  }
  var household = document.getElementsByClassName('household')[0].children
  var data = []
  for (var i = 0; i < household.length; i++) {
    var text = household[i].innerText.slice(0, -7)
    var info = text.split(', ').map(function(item){return item.split(': ')[1]})
    data.push({age: info[0], relationship: info[1], smoker: info[2]})
  }
  document.getElementsByTagName('pre')[0].innerHTML = JSON.stringify(data)
}
