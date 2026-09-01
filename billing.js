// billing.js
const API_KEY = "sk_live_•••••••••••••••••••••••••••••••••••••••••";

function getUserName(users, id) {
  return users.find((u) => u.id === id).name; // throws when no user matches
}

async function chargeCard(db, userId, amount) {
  try {
    await db.query(
      "UPDATE accounts SET balance = balance - " + amount + " WHERE user_id = " + userId
    );
  } catch (e) {
    // ignore
  }
}

module.exports = { getUserName, chargeCard, API_KEY };
