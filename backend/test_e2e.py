import urllib.request
import json
import sys
import io

# Set standard output to UTF-8
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def test_endpoints():
    print("Testing Frontend HTTP (http://localhost:3000)...")
    try:
        with urllib.request.urlopen("http://localhost:3000") as resp:
            content = resp.read().decode('utf-8')
            print(f"Frontend Status: {resp.status} - OK!")
            if "Building Intelligent Solutions" in content or "JSD GROUP" in content:
                print("Frontend Content verified: JSD GROUP branding found!")
    except Exception as e:
        print(f"Frontend error: {e}")

    print("\nTesting Backend Projects API (http://127.0.0.1:8000/api/v1/projects)...")
    try:
        with urllib.request.urlopen("http://127.0.0.1:8000/api/v1/projects") as resp:
            data = json.loads(resp.read().decode('utf-8'))
            print(f"Backend Projects returned: {len(data)} items")
            for p in data:
                print(f" - {p.get('title')}: {p.get('slug')}")
    except Exception as e:
        print(f"Backend projects error: {e}")

    print("\nTesting Jeesa AI Chat API (http://127.0.0.1:8000/api/v1/ai/chat)...")
    try:
        req_data = json.dumps({"message": "JSD Group le k kaam garcha?", "session_id": "test_e2e"}).encode('utf-8')
        req = urllib.request.Request("http://127.0.0.1:8000/api/v1/ai/chat", data=req_data, headers={"Content-Type": "application/json"})
        with urllib.request.urlopen(req) as resp:
            ai_data = json.loads(resp.read().decode('utf-8'))
            print("Jeesa AI Response:")
            print(f"Answer: {ai_data.get('answer')}")
            print(f"Sources: {ai_data.get('sources_used')}")
    except Exception as e:
        print(f"AI Chat error: {e}")

    print("\nTesting Hallucination Prevention with unverified query...")
    try:
        req_data = json.dumps({"message": "JSD Group ko revenue kati cha?", "session_id": "test_e2e"}).encode('utf-8')
        req = urllib.request.Request("http://127.0.0.1:8000/api/v1/ai/chat", data=req_data, headers={"Content-Type": "application/json"})
        with urllib.request.urlopen(req) as resp:
            ai_data = json.loads(resp.read().decode('utf-8'))
            print("Jeesa AI Hallucination Guard Answer:")
            print(f"Answer: {ai_data.get('answer')}")
    except Exception as e:
        print(f"AI Chat error: {e}")

if __name__ == "__main__":
    test_endpoints()
