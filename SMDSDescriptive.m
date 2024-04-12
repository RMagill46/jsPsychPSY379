% Load the data from CSV file
data = readtable('SMDSResponses.csv');

% Initialize variables to store SMDS scores for each group
group1Scores = [];
group2Scores = [];
group3Scores = [];

% Loop through each row of the table
for i = 1:height(data)
    % Determine the group number
    groupNum = data{i, 3};
    % Sum the "Yes" responses for SMDS questions for the current row
    smdsScore = sum(strcmp(data{i, 4:12}, 'Yes'));
    
    % Append the SMDS score to the corresponding group
    switch groupNum
        case 1
            group1Scores = [group1Scores; smdsScore];
        case 2
            group2Scores = [group2Scores; smdsScore];
        case 3
            group3Scores = [group3Scores; smdsScore];
    end
end

% Calculate and display descriptive statistics for each group
groups = {group1Scores, group2Scores, group3Scores};
for i = 1:length(groups)
    fprintf('Group %d SMDS Scores:\n', i);
    fprintf('Mean: %.2f\n', mean(groups{i}));
    fprintf('Median: %.2f\n', median(groups{i}));
    fprintf('Standard Deviation: %.2f\n', std(groups{i}));
    fprintf('Minimum: %d\n', min(groups{i}));
    fprintf('Maximum: %d\n\n', max(groups{i}));
end

% Generate a box plot for the SMDS scores
figure; % Create a new figure window
boxplot([group1Scores; group2Scores; group3Scores], ...
        [repmat(1, length(group1Scores), 1); repmat(2, length(group2Scores), 1); repmat(3, length(group3Scores), 1)], ...
        'Labels', {'Group 1 (Passive Scrolling)', 'Group 2 (Active Engagement)', 'Group 3 (Control)'});
title('Box Plot of SMDS Scores by Group');
ylabel('SMDS Score');
xlabel('Group');

% Save the figure to a file
saveas(gcf, 'SMDS_BoxPlot.png');
