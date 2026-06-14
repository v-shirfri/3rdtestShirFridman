const BASE_URL = "";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    let message = "Something went wrong. Please try again.";
    try {
      const data = await res.json();
      if (data && data.message) message = data.message;
    } catch (_) {}
    throw new Error(message);
  }

  return res.json();
}

export function getGroups() {
  return request("/groups");
}

export function getGroupMeetings(groupId) {
  return request(`/groups/${groupId}/meetings`);
}

export function getMeeting(meetingId) {
  return request(`/meetings/${meetingId}`);
}

export function updateMeeting(meetingId, body) {
  return request(`/meetings/${meetingId}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export function deleteMeeting(meetingId) {
  return request(`/meetings/${meetingId}`, { method: "DELETE" });
}

export function addMeeting(body) {
  return request("/meetings", {
    method: "POST",
    body: JSON.stringify(body),
  });
}
