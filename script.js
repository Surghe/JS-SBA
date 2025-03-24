const getLearnerData = (CourseInfo, AssignmentGroup, LearnerSubmissions) => {
    try {
        // Validate that the AssignmentGroup belongs to the correct course
        if (AssignmentGroup.course_id !== CourseInfo.id) {
            throw new Error("Invalid input: AssignmentGroup does not belong to the specified course.");
        }

        // Get the current date to compare with due dates
        const currentDate = new Date();

        // Filter assignments that are due
        const dueAssignments = AssignmentGroup.assignments.filter(assignment => {
            const dueDate = new Date(assignment.due_at);
            return dueDate <= currentDate;
        });

        // Create a map to store learner data
        const learnerDataMap = new Map();

        // Process each learner submission
        for (const submission of LearnerSubmissions) {
            const assignment = dueAssignments.find(a => a.id === submission.assignment_id);
            if (assignment) {
                const learnerId = submission.learner_id;
                const assignmentId = assignment.id;
                const pointsPossible = assignment.points_possible;
                let score = submission.submission.score;

                // Check if points_possible is zero
                if (pointsPossible === 0) {
                    throw new Error("Invalid input: points_possible cannot be zero.");
                }
