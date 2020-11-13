
const API_URL = "http://localhost:8002"
async function listOfLogEntries() {
	const response = fetch(`${API_URL}/api/logs`);
	return (await response).json()
}

export default listOfLogEntries;