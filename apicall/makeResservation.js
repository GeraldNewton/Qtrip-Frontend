const make_reservation = async (book_obj) => {
  const Username = localStorage.getItem("Username");
  const token = localStorage.getItem("token");
  if (!Username || !token) {
    alert(
      "Not able to make reservation due to faulty login, you should ligin again to avoid this problem"
    );
    return;
  }
  try {
    const res = await axios.post(
      "http://localhost:3000/reservations",
      {
        Username: Username,
        date_of_visit: book_obj.date,
        person: book_obj.number,
        adventureName: book_obj.adventureName,
        price: book_obj.price,
        date_of_reservation: new Date(),
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (e) {
    console.log(e);
    if (e.response.data.error === "Validation Error") {
      alert(
        `${e.response.data.error}: ${e.response.data.message}, To know more click on ok`
      );
      e.response.data.error_array.forEach((val) => alert(val));
    } else if (e.response.data.error === "Validation Falied")
      alert(`Validation failed: ${message}`);
    else if (
      e.response.data.error === "Invalid Token" ||
      e.response.data.error === "UserName Invalid"
    )
      alert(
        "cannot make reservation due to faulty login, login again to clear this error"
      );
    else if (e.response.data.error === "Token Error")
      alert(
        "cannot make reservation due to end of session, login again to clear this error"
      );
    else if (e.response.data.error === "Not Available")
      alert(e.response.data.message);
    else alert("Cannot Login experiencing unknown error");
  }
};

export default make_reservation;

// "Username":"Arpit",
// "date_of_visit":"2024-08-05",
// "person":5,
// "adventureName":"Tifwales Ferry",
// "price":5623,
// "date_of_resevation":"2024-07-04"

//   if (e.name && e.name == "ValidationError") {
//     const obj = {
//       error: "Valdiation Falied",
//       message: e.message.slice(31, e.message.length), //! understood by looking at the e.message
//     };
//     res.status(http.BAD_REQUEST).json(obj);
//   } else
//     res
//       .status(http.INTERNAL_SERVER_ERROR)
//       .send({ error: "Not Available", message: "internal server error" });
//
