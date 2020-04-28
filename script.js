const strengthMeter = document.getElementById("strength-meter");
const passwordInput = document.getElementById("password-input");
const reasonsContainer = document.getElementById("reasons");
const strengthTotal = document.getElementById("strength");

passwordInput.addEventListener("input", updateStrengthMeter);
updateStrengthMeter();

function updateStrengthMeter() {
  const weaknesses = calculatePasswordStrength(passwordInput.value);

  let strength = 100;
  reasonsContainer.innerHTML = "";
  weaknesses.forEach((weakness) => {
    if (weakness == null) return;
    strength -= weakness.deduction;

    const messageElement = document.createElement("div");
    messageElement.innerText = weakness.message;
    reasonsContainer.appendChild(messageElement);
  });
  strengthMeter.style.setProperty("--strength", strength);

  if (strength < 0) {
    strength = 0;
  }

  strengthPercentage(strength);
}

function strengthPercentage(strength) {
  strengthTotal.innerHTML = "";
  const arr = [];
  const strengthElement = document.createElement("h2");
  strengthElement.innerText = strength;
  arr.push(strengthTotal.appendChild(strengthElement));

  const strengthTest = () => {
    if (arr.length >= 1) {
      arr.shift();
    }
  };

  return strengthTest();
}

function calculatePasswordStrength(password) {
  const weaknesses = [];
  weaknesses.push(lengthWeakness(password));
  weaknesses.push(lowercaseWeakness(password));
  weaknesses.push(uppercaseWeakness(password));
  weaknesses.push(numbersWeakness(password));
  weaknesses.push(specialCharactersWeakness(password));
  weaknesses.push(repeatCharactersWeakness(password));

  if (weaknesses.length <= 0) {
    return weakness.push("Input password");
  } else {
    return weaknesses;
  }
}

// function scoreCheck(password) {
//     if ()
// }

function lengthWeakness(password) {
  const length = password.length;

  if (length <= 5) {
    return {
      message: "Your password is too short",
      deduction: 40,
    };
  }

  if (length <= 10) {
    return {
      message: "Your password could be longer",
      deduction: 15,
    };
  }
}

function uppercaseWeakness(password) {
  return characterTypeWeakeness(password, /[A-Z]/g, "uppercase characters");
}

function lowercaseWeakness(password) {
  return characterTypeWeakeness(password, /[a-z]/g, "lowercase characters");
}

function numbersWeakness(password) {
  return characterTypeWeakeness(password, /[0-9]/g, "numbers");
}

function specialCharactersWeakness(password) {
  return characterTypeWeakeness(
    password,
    /[^0-9a-zA-Z\s]/g,
    "special characters"
  );
}

function characterTypeWeakeness(password, regex, type) {
  const matches = password.match(regex) || [];

  if (matches.length === 0) {
    return {
      message: `Your password has no ${type}`,
      deduction: 20,
    };
  }

  if (matches.length <= 2) {
    return {
      message: `Your password could use more ${type}`,
      deduction: 5,
    };
  }
}

function repeatCharactersWeakness(password) {
  const matches = password.match(/(.)\1/g) || [];

  if (matches.length > 0) {
    return {
      message: "Your password has repeat characters",
      deduction: matches.length * 10,
    };
  }
}
