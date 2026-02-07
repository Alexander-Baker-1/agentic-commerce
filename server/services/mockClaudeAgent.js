// Temporary mock agent - rule-based intent parsing
// Will be replaced with real Claude API when credits arrive

class MockClaudeAgent {
  constructor() {
    this.conversationHistory = new Map();
  }

  /**
   * Mock intent parsing using regex and keywords
   */
  async parseIntent(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Extract budget
    const budgetMatch = message.match(/\$?(\d+)/);
    const budget = budgetMatch ? parseInt(budgetMatch[1]) : 400;

    // Extract size
    let size = 'M';
    if (message.includes('small') || message.includes(' s ') || message.includes('size s')) size = 'S';
    if (message.includes('large') || message.includes(' l ') || message.includes('size l')) size = 'L';
    if (message.includes('xl') || message.includes('x-large')) size = 'XL';

    // Extract delivery days
    const daysMatch = message.match(/(\d+)\s*days?/);
    const delivery_days = daysMatch ? parseInt(daysMatch[1]) : 5;

    // Extract warmth level
    let warmth = 'medium';
    if (message.includes('extra warm') || message.includes('very warm')) warmth = 'extra warm';
    if (message.includes('cold') || message.includes('freezing')) warmth = 'extra warm';
    if (message.includes('light')) warmth = 'light';

    // Extract colors
    const colors = [];
    if (message.includes('black')) colors.push('black');
    if (message.includes('navy') || message.includes('blue')) colors.push('navy');
    if (message.includes('red')) colors.push('red');
    if (message.includes('gray') || message.includes('grey')) colors.push('gray');
    if (message.includes('white')) colors.push('white');

    // Determine items needed
    let items_needed = ['jacket', 'pants', 'base_layer', 'gloves', 'goggles'];
    if (message.includes('just jacket') || message.includes('only jacket')) {
      items_needed = ['jacket'];
    } else if (message.includes('jacket and pants')) {
      items_needed = ['jacket', 'pants'];
    } else if (message.includes('full outfit') || message.includes('complete')) {
      items_needed = ['jacket', 'pants', 'base_layer', 'gloves', 'goggles', 'helmet', 'socks'];
    }

    // Determine priority
    let prioritize = null;
    if (message.includes('cheap') || message.includes('budget')) prioritize = 'budget';
    if (message.includes('fast') || message.includes('quick') || message.includes('asap')) prioritize = 'delivery';
    if (message.includes('quality') || message.includes('best')) prioritize = 'quality';

    const intent = {
      budget,
      size,
      delivery_days,
      warmth,
      colors,
      items_needed,
      prioritize,
      brands: []
    };

    console.log('[MOCK AGENT] Parsed intent:', intent);

    return {
      success: true,
      intent,
      rawResponse: JSON.stringify(intent)
    };
  }

  /**
   * Mock chat responses
   */
  async chat(userMessage, sessionId = 'default', context = {}) {
    let response = '';

    const message = userMessage.toLowerCase();

    // Generate contextual response
    if (!context.currentIntent) {
      response = "Hi! I'm here to help you find the perfect skiing outfit. What are you looking for? Tell me about your budget, size, and when you need it delivered.";
    } else if (context.cartItems && context.cartItems.length > 0) {
      response = `Great! I've found ${context.cartItems.length} items for your skiing outfit. The total is $${context.cartTotal}. Would you like to see cheaper alternatives or proceed to checkout?`;
    } else if (message.includes('cheaper') || message.includes('budget')) {
      response = "I'll look for more budget-friendly options while maintaining quality and safety standards.";
    } else if (message.includes('thank')) {
      response = "You're welcome! Let me know if you need anything else.";
    } else {
      response = "I'm searching for the best products that match your requirements. One moment...";
    }

    return {
      success: true,
      message: response,
      sessionId
    };
  }

  /**
   * Mock ranking explanation
   */
  async explainRanking(rankedProducts, userIntent) {
    const top = rankedProducts[0];
    return `I recommended the ${top.name} because it offers the best combination of quality (${top.specs?.waterproof_rating || 'high waterproof rating'}), price ($${top.price}), and fast delivery (${top.delivery_days} days). It fits within your $${userIntent.budget} budget and meets your ${userIntent.warmth} warmth requirements.`;
  }

  /**
   * Mock budget suggestions
   */
  async suggestBudgetAlternatives(currentOutfit, budget) {
    const overBudget = currentOutfit.totalCost - budget;
    return `You're $${overBudget} over budget. Consider choosing a more affordable jacket or switching to a budget-friendly brand for the base layers. This could save you $50-100 without sacrificing essential waterproofing and warmth.`;
  }

  clearHistory(sessionId) {
    this.conversationHistory.delete(sessionId);
  }
}

module.exports = new MockClaudeAgent();