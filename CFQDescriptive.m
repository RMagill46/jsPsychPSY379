% Load the data from CSV file
data = readtable('CFQResponses.csv', 'ReadVariableNames', false);

% Define scoring for CFQ responses
scoresMap = containers.Map({'Never', 'Very Rarely', 'Occasionally', 'Quite Often', 'Very Often'}, 0:4);

% Initialize variables to store CFQ scores for each group
group1CFQScores = [];
group2CFQScores = [];
group3CFQScores = [];

% Loop through each row of the table
for i = 1:height(data)
    % Extract the group number
    groupNum = data{i, 3};
    
    % Initialize sum for this participant's CFQ score
    participantCFQScore = 0;
    
    % Convert CFQ responses to scores and sum
    for j = 4:28 
        response = data{i, j}{1}; % Extract the response
        if isKey(scoresMap, response)
            participantCFQScore = participantCFQScore + scoresMap(response);
        else
            error('Unexpected CFQ response: %s', response);
        end
    end
    
    % Append the CFQ score to the corresponding group
    switch groupNum
        case 1
            group1CFQScores = [group1CFQScores; participantCFQScore];
        case 2
            group2CFQScores = [group2CFQScores; participantCFQScore];
        case 3
            group3CFQScores = [group3CFQScores; participantCFQScore];
    end
end

% Directly calculate and display descriptive statistics for each group
groups = {group1CFQScores, group2CFQScores, group3CFQScores};
groupNames = {'Group 1', 'Group 2', 'Group 3'};

for i = 1:length(groups)
    fprintf('%s CFQ Scores:\n', groupNames{i});
    fprintf('Mean: %.2f\n', mean(groups{i}));
    fprintf('Median: %.2f\n', median(groups{i}));
    fprintf('Standard Deviation: %.2f\n', std(groups{i}));
    fprintf('Minimum: %d\n', min(groups{i}));
    fprintf('Maximum: %d\n\n', max(groups{i}));
end

% Combine scores into a single array and create a group array for labeling
scores = [group1CFQScores, group2CFQScores, group3CFQScores];
groups = [repmat({'Group 1 (Passive Scrolling)'}, 1, length(group1Scores)), ...
          repmat({'Group 2 (Active Engagement)'}, 1, length(group2Scores)), ...
          repmat({'Group 3 (Control)'}, 1, length(group3Scores))];

% Create the boxplot
boxplot(scores, groups)
title('CFQ Scores by Group')
ylabel('CFQ Score')

% Save the figure
saveas(gcf, 'CFQ_Boxplot.fig')
saveas(gcf, 'CFQ_Boxplot.png')
