export const fetchRecipesFromApi = async(query) => {
    try{
        const result = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,{cache:"no-store"});
        const data = await result.json();
        return data.meals || [];
    }
    catch (err) {   console.log("Error Data Fetching :", err);       return [];    }
}