const API_URL =
  "https://modelo-procesamiento-lenguaje-lbpp3pxtwa-uc.a.run.app/api/chat";

export async function GetTeacherResponse(name: string, message: string) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      sentence: message,
    }),
  });

  const data = await response.json();

  return data;
}

export async function GetAdminResponse(name: string, message: string) {
  const response = await fetch(API_URL + "/admin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      sentence: message,
    }),
  });

  const data = await response.json();

  return data;
}

export async function GetStudentResponse(name: string, message: string) {
  const response = await fetch(API_URL + "/student", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      sentence: message,
    }),
  });

  const data = await response.json();

  return data;
}
