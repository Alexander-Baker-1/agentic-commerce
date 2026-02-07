const express = require('express');
const router = express.Router();
const claudeAgent = require('../services/claudeAgent');
const retailerAdapter = require('../services/retailerAdapter');
const rankingEngine = require('../services/rankingEngine');

/**
 * POST /api/chat/intent
 * Parse user intent from natural language
 */
router.post('/intent', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        error: 'Message is required'
      });
    }

    const result = await claudeAgent.parseIntent(message);

    res.json(result);

  } catch (error) {
    console.error('Intent parsing error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/chat/message
 * Chat with the assistant
 */
router.post('/message', async (req, res) => {
  try {
    const { message, sessionId, context } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        error: 'Message is required'
      });
    }

    const result = await claudeAgent.chat(
      message,
      sessionId || 'default',
      context || {}
    );

    res.json(result);

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/chat/explain-ranking
 * Get explanation for product rankings
 */
router.post('/explain-ranking', async (req, res) => {
  try {
    const { rankedProducts, userIntent } = req.body;

    const explanation = await claudeAgent.explainRanking(
      rankedProducts,
      userIntent
    );

    res.json({
      success: true,
      explanation
    });

  } catch (error) {
    console.error('Explanation error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/chat/suggest-alternatives
 * Get budget-friendly alternatives
 */
router.post('/suggest-alternatives', async (req, res) => {
  try {
    const { currentOutfit, budget } = req.body;

    const allProducts = await retailerAdapter.getAllProducts();
    const suggestions = await claudeAgent.suggestBudgetAlternatives(
      currentOutfit,
      budget,
      allProducts
    );

    res.json({
      success: true,
      suggestions
    });

  } catch (error) {
    console.error('Suggestions error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * DELETE /api/chat/session/:sessionId
 * Clear chat history for a session
 */
router.delete('/session/:sessionId', (req, res) => {
  try {
    const { sessionId } = req.params;
    claudeAgent.clearHistory(sessionId);

    res.json({
      success: true,
      message: 'Session history cleared'
    });

  } catch (error) {
    console.error('Clear session error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;