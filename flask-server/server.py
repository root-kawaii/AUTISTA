import boto3
import pandas as pd

# Make dataframes
foo = pd.DataFrame({'x': [1, 2, 3], 'y': ['a', 'b', 'c']})
bar = pd.DataFrame({'x': [10, 20, 30], 'y': ['aa', 'bb', 'cc']})

# Save to csv
foo.to_csv('foo.csv')
bar.to_csv('bar.csv')


s3 = boto3.resource(
    service_name='s3',
    region_name='eu-central-1',
    aws_access_key_id='AKIATA4NFR522E4NRMQV',
    aws_secret_access_key='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'
)

# Upload files to S3 bucket
s3.Bucket('aui20222').upload_file(Filename='foo.csv', Key='foo.csv')
s3.Bucket('aui20222').upload_file(Filename='bar.csv', Key='bar.csv')

obj_list_key = []
for obj in s3.Bucket('aui20222').objects.all():
    print(obj.key)
    obj_list_key.append(obj.key)
    
    
