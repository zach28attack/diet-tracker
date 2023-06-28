import DiarySummary from "../components/diary/DiarySummary";
import Diary from "../components/diary/Diary";
import {getOneDiary, getTenDiaries, saveNewItem, deleteItem} from "../apis/diaryApi";
import {useState, useEffect} from "react";

function HomePage() {
  // const diaries = [{name: "Egg", servings: 1, calories: 205}];
  const [breakfastItems, setBreakfastItems] = useState([]);
  const [lunchItems, setLunchItems] = useState([]);
  const [dinnerItems, setDinnerItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalBreakfastCalories, setTotalBreakfastCalories] = useState(0);
  const [totalLunchCalories, setTotalLunchCalories] = useState(0);
  const [totalDinnerCalories, setTotalDinnerCalories] = useState(0);

  const breakfastAddHandler = async (newItem) => {
    newItem._id = 0;
    setBreakfastItems((prevItems) => [newItem, ...prevItems]);
    setTotalBreakfastCalories(
      (prevItems) => parseInt(prevItems) + parseInt(newItem.calories) * parseInt(newItem.servings)
    );

    newItem._id = await saveNewItem(newItem);
    setBreakfastItems((prevItems) => {
      const arr = [...prevItems];
      arr[-1] = newItem;
      return arr;
    });
  };
  const updateBreakfastTotals = (prevCal, newCal) => {
    setTotalBreakfastCalories((prevCals) => {
      let total = prevCals;
      total -= prevCal;
      return total + parseInt(newCal);
    });
  };

  const lunchAddHandler = async (newItem) => {
    newItem._id = 0;
    setLunchItems((prevItems) => [newItem, ...prevItems]);
    setTotalLunchCalories((prevItems) => parseInt(prevItems) + parseInt(newItem.calories) * parseInt(newItem.servings));

    newItem._id = await saveNewItem(newItem);
    setLunchItems((prevItems) => {
      const arr = [...prevItems];
      arr[-1] = newItem;
      return arr;
    });
  };
  const updateLunchTotals = (prevCal, newCal) => {
    setTotalLunchCalories((prevCals) => {
      let total = prevCals;
      total -= prevCal;
      return total + parseInt(newCal);
    });
  };

  const DinnerAddHandler = async (newItem) => {
    newItem._id = 0;
    setDinnerItems((prevItems) => [newItem, ...prevItems]);
    setTotalDinnerCalories(
      (prevItems) => parseInt(prevItems) + parseInt(newItem.calories) * parseInt(newItem.servings)
    );

    newItem._id = await saveNewItem(newItem);
    setDinnerItems((prevItems) => {
      const arr = [...prevItems];
      arr[-1] = newItem;
      return arr;
    });
  };
  const updateDinnerTotals = (prevCal, newCal) => {
    setTotalDinnerCalories((prevCals) => {
      let total = prevCals;
      total -= prevCal;
      return total + parseInt(newCal);
    });
  };

  const deleteItemHandler = (_id, removedCal, timeOfDay) => {
    deleteItem(_id);
    if (timeOfDay === "Breakfast") {
      setBreakfastItems((prevItems) => {
        return prevItems.filter((item) => item._id !== _id);
      });
      updateBreakfastTotals(removedCal, 0);
    } else if (timeOfDay === "Lunch") {
      setLunchItems((prevItems) => {
        return prevItems.filter((item) => item._id !== _id);
      });
      updateLunchTotals(removedCal, 0);
    } else if (timeOfDay === "Dinner") {
      setDinnerItems((prevItems) => {
        return prevItems.filter((item) => item._id !== _id);
      });
      updateDinnerTotals(removedCal, 0);
    }
  };

  const getItemsFromDiary = async () => {
    const items = await getOneDiary(); // will return all items from a given day
    if (items) {
      setIsLoading(false);
      items.forEach((item) => {
        item.timeOfDay === "Breakfast"
          ? setBreakfastItems((prevItems) => [item, ...prevItems])
          : item.timeOfDay === "Lunch"
          ? setLunchItems((prevItems) => [item, ...prevItems])
          : item.timeOfDay === "Dinner"
          ? setDinnerItems((prevItems) => [item, ...prevItems])
          : undefined;
        getCalorieTotals(item);
      });
    }
  };
  const getCalorieTotals = (item) => {
    item.timeOfDay === "Breakfast"
      ? setTotalBreakfastCalories(
          (prevItems) => parseInt(prevItems) + parseInt(item.calories) * parseInt(item.servings)
        )
      : item.timeOfDay === "Lunch"
      ? setTotalLunchCalories((prevItems) => parseInt(prevItems) + parseInt(item.calories) * parseInt(item.servings))
      : item.timeOfDay === "Dinner"
      ? setTotalDinnerCalories((prevItems) => parseInt(prevItems) + parseInt(item.calories) * parseInt(item.servings))
      : undefined;
  };
  const [recentItems, setRecentItems] = useState([]);
  const getItemsFromDiaries = async () => {
    const diaries = await getTenDiaries();
    let items = [];
    diaries.map((diary) => {
      if (items.length <= 20) {
        items.push(...diary.items);
      }
    });
    setRecentItems([...new Set(items.reverse())]);
  };

  useEffect(() => {
    getItemsFromDiary();
    getItemsFromDiaries(); // calls getTenDiaries and extract items
  }, []);
  return (
    <>
      <DiarySummary calories={totalBreakfastCalories + totalLunchCalories + totalDinnerCalories} />
      <Diary
        timeOfDay={"Breakfast"}
        items={breakfastItems}
        isLoading={isLoading}
        addItem={breakfastAddHandler}
        updateTotalCals={updateBreakfastTotals}
        totalCalories={totalBreakfastCalories}
        deleteItem={deleteItemHandler}
        recentItems={recentItems}
      />
      <Diary
        timeOfDay={"Lunch"}
        items={lunchItems}
        isLoading={isLoading}
        addItem={lunchAddHandler}
        updateTotalCals={updateLunchTotals}
        totalCalories={totalLunchCalories}
        deleteItem={deleteItemHandler}
      />
      <Diary
        timeOfDay={"Dinner"}
        items={dinnerItems}
        isLoading={isLoading}
        addItem={DinnerAddHandler}
        updateTotalCals={updateDinnerTotals}
        totalCalories={totalDinnerCalories}
        deleteItem={deleteItemHandler}
      />
    </>
  );
}

export default HomePage;
