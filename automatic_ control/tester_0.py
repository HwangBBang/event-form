import subprocess

# 스크립트 이름 리스트
scripts = ["./hackaton/server_test_0.py",
           "./hackaton/server_test_1.py",
           "./hackaton/server_test_2.py",
           "./hackaton/server_test_3.py",
           "./hackaton/server_test_4.py",
           "./hackaton/server_test_5.py",
           "./hackaton/server_test_6.py",
           "./hackaton/server_test_7.py",
           "./hackaton/server_test_8.py"
           ]
# python 경로 지정
python_path = "/opt/homebrew/bin/python3.10"

# 각 스크립트를 병렬로 실행
processes = [subprocess.Popen([python_path, script]) for script in scripts]

# 모든 프로세스가 종료될 때까지 대기
for process in processes:
    process.wait()
