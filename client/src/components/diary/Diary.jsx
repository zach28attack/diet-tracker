import Class from "./Diary.module.css";
import DiaryItem from "./DiaryItem";
import AddIcon from "./AddIcon";

function Diary(props) {
  return (
    <div className={Class.container}>
      <header className={Class.header}>
        <div>
          {props.timeOfDay}: {props.totalCalories}
        </div>
        <AddIcon addItem={props.addItem} />
      </header>
      {props.isLoading ? (
        <main className={Class.items}>
          <div id="form-location"></div>
          <div className={Class.loading}>Loading...</div>
        </main>
      ) : (
        <main className={Class.items}>
          <div id="form-location"></div>
          {props.items.map((item) => (
            <DiaryItem
              key={`${Math.random()}`}
              timeOfDay={props.timeOfDay}
              name={item.name}
              servings={item.servings}
              calories={item.calories}
            />
          ))}
        </main>
      )}
      <div className={Class.addBtn}></div>
    </div>
  );
}

export default Diary;
