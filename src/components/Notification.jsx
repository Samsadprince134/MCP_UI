const Notification = ({ message, type }) => {

  const getColor = () => {

    if(type === "success")
      return "bg-green-600";

    if(type === "error")
      return "bg-red-600";

    return "bg-blue-600";
  };

  return (

    <div className={`
      fixed top-5 right-5 z-50
      ${getColor()}
      text-white
      px-6 py-4
      rounded-xl
      shadow-2xl
     
    `}>

      <p className="font-semibold">
        {message}
      </p>

    </div>
  );
};

export default Notification;