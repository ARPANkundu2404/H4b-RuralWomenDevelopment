export const analyzeExpenses = (expenseDetails) => {
    const categories = ["Food", "Rent", "Travel", "Shopping", "Entertainment", "Other"];
    let suggestions = [];
  
    const breakdown = expenseDetails.split(",").map(item => item.trim());
    
    let categoryCount = {};
    categories.forEach(category => categoryCount[category] = 0);
  
    breakdown.forEach(item => {
      categories.forEach(category => {
        if (item.toLowerCase().includes(category.toLowerCase())) {
          categoryCount[category] += 1;
        }
      });
    });
  
    if (categoryCount["Shopping"] > 2) {
      suggestions.push("Reduce unnecessary shopping expenses.");
    }
    if (categoryCount["Entertainment"] > 2) {
      suggestions.push("Limit entertainment spending, try free activities.");
    }
    if (categoryCount["Food"] > 3) {
      suggestions.push("Consider cooking at home instead of eating out.");
    }
  
    if (suggestions.length === 0) {
      suggestions.push("Try tracking expenses better to identify spending patterns.");
    }
  
    return suggestions;
  };
  