import Issue from "../models/Issue.js";

export const getCitizenStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const total = await Issue.countDocuments({ userId });
    const pending = await Issue.countDocuments({
      userId,
      status: { $in: ["reported", "in_review", "assigned"] },
    });
    const resolved = await Issue.countDocuments({
      userId,
      status: "resolved",
    });

    res.json({ total, pending, resolved });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getCitizenRecentIssues = async (req, res) => {
  try {
    const userId = req.user.id;

    const issues = await Issue.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(issues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
