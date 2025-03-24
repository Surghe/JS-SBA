
                // Check if the submission is late
                const submittedDate = new Date(submission.submission.submitted_at);
                const dueDate = new Date(assignment.due_at);
                if (submittedDate > dueDate) {
                    // Deduct 10% of the total points possible
                    score -= 0.1 * pointsPossible;
                }

                // Calculate the percentage score
                const percentageScore = (score / pointsPossible) * 100;

                // Initialize learner data if not already present
                if (!learnerDataMap.has(learnerId)) {
                    learnerDataMap.set(learnerId, {
                        id: learnerId,
                        totalScore: 0,
                        totalPoints: 0,
                        scores: {}
                    });
                }

                // Update learner data
                const learnerData = learnerDataMap.get(learnerId);
                learnerData.totalScore += score;
                learnerData.totalPoints += pointsPossible;
                learnerData.scores[assignmentId] = percentageScore;
            }
        }

        // Calculate the weighted average for each learner
        const result = [];
        for (const [learnerId, learnerData] of learnerDataMap.entries()) {
            if (learnerData.totalPoints === 0) continue; // Skip if no points are possible
            const avg = (learnerData.totalScore / learnerData.totalPoints) * 100;
            result.push({
                id: learnerId,
                avg: avg,
                ...learnerData.scores
            });
        }

        return result;
    } catch (error) {
        console.error("Error processing learner data:", error.message);
        return [];
    }
};

// Provided data
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
        {
            id: 1,
            name: "Declare a Variable",
            due_at: "2023-01-25",
            points_possible: 50
        },
        {
            id: 2,
            name: "Write a Function",
            due_at: "2023-02-27",
            points_possible: 150
        },
        {
            id: 3,
            name: "Code the World",
            due_at: "3156-11-15",
            points_possible: 500
        }
    ]
};

const LearnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-25",
            score: 47
        }
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-02-12",
            score: 150
        }
    },
    {
        learner_id: 125,
        assignment_id: 3,
        submission: {
            submitted_at: "2023-01-25",
            score: 400
        }
    },
    {
        learner_id: 132,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-24",
            score: 39
        }
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-03-07",
            score: 140
        }
    }
];

// Log the result
console.log(getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions));
